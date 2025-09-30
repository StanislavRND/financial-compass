import { Injectable } from "@nestjs/common";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { PrismaService } from "src/prisma.service";

interface CreateIncomeDto {
  sum: number;
  categoryId: number;
  date: string;
  userId: number;
  familyId?: number;
}

function parseDateFromString(dateStr: string): Date {
  const [day, month, year] = dateStr.split(".");
  const now = new Date();

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );
}

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async createIncome(income: CreateIncomeDto) {
    const date = parseDateFromString(income.date);

    const data = {
      sum: income.sum,
      date,
      userId: income.userId,
      familyId: income.familyId ?? null,
      categoryId: income.categoryId,
    };

    return this.prisma.income.create({ data });
  }

  async getIncomeByFilter(
    userId: number,
    familyId: number | null,
    filter: "day" | "week" | "month" | "year" = "day",
    date?: Date
  ) {
    const baseDate = date ?? new Date();
    let dateFilter: { gte: Date; lte: Date };

    switch (filter) {
      case "day":
        dateFilter = { gte: startOfDay(baseDate), lte: endOfDay(baseDate) };
        break;
      case "week":
        dateFilter = {
          gte: startOfWeek(baseDate, { weekStartsOn: 1 }),
          lte: endOfWeek(baseDate, { weekStartsOn: 1 }),
        };
        break;
      case "month":
        dateFilter = { gte: startOfMonth(baseDate), lte: endOfMonth(baseDate) };
        break;
      case "year":
        dateFilter = { gte: startOfYear(baseDate), lte: endOfYear(baseDate) };
        break;
      default:
        dateFilter = { gte: startOfDay(baseDate), lte: endOfDay(baseDate) };
    }

    const whereCondition = familyId
      ? { familyId, date: dateFilter }
      : { userId, date: dateFilter };

    return this.prisma.income.findMany({
      where: whereCondition,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });
  }

  async getLastNIncome(
    userId: number,
    familyId: number | null,
    filter: "day" | "week" | "month" | "year" = "day",
    n: number = 5
  ) {
    const ranges: { gte: Date; lte: Date }[] = [];
    const now = new Date();

    for (let i = n - 1; i >= 0; i--) {
      switch (filter) {
        case "day":
          ranges.push({
            gte: startOfDay(subDays(now, i)),
            lte: endOfDay(subDays(now, i)),
          });
          break;
        case "week":
          ranges.push({
            gte: startOfWeek(subWeeks(now, i), { weekStartsOn: 1 }),
            lte: endOfWeek(subWeeks(now, i), { weekStartsOn: 1 }),
          });
          break;
        case "month":
          ranges.push({
            gte: startOfMonth(subMonths(now, i)),
            lte: endOfMonth(subMonths(now, i)),
          });
          break;
        case "year":
          ranges.push({
            gte: startOfYear(subYears(now, i)),
            lte: endOfYear(subYears(now, i)),
          });
          break;
      }
    }

    const allIncome = await Promise.all(
      ranges.map((range) =>
        this.prisma.income.findMany({
          where: familyId ? { familyId, date: range } : { userId, date: range },
          include: {
            category: { select: { id: true, name: true, color: true } },
          },
        })
      )
    );

    return allIncome;
  }

  async deleteIncome(id: number) {
    await this.prisma.income.delete({ where: { id } });
  }
}
