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

  async deleteExpense(id: number) {
    await this.prisma.expense.delete({
      where: { id },
    });
  }
}
