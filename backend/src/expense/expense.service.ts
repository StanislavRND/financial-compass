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

interface CreateExpenseDto {
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
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async createExpense(expense: CreateExpenseDto) {
    const date = parseDateFromString(expense.date);

    const data = {
      sum: expense.sum,
      date,
      userId: expense.userId,
      familyId: expense.familyId ?? null,
      categoryId: expense.categoryId,
    };

    return this.prisma.expense.create({ data });
  }

  async getExpensesByFilter(
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

    return this.prisma.expense.findMany({
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

  async getLastNExpenses(
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

    const allExpenses = await Promise.all(
      ranges.map((range) =>
        this.prisma.expense.findMany({
          where: familyId ? { familyId, date: range } : { userId, date: range },
          include: {
            category: {
              select: { id: true, name: true, color: true },
            },
          },
        })
      )
    );

    return allExpenses;
  }

  async deleteExpense(id: number) {
    await this.prisma.expense.delete({
      where: { id },
    });
  }

  async transferUserExpensesToFamily(userId: number, familyId: number) {
    return await this.prisma.expense.updateMany({
      where: {
        userId: userId,
        familyId: null, 
      },
      data: {
        familyId: familyId,
      },
    });
  }
}
