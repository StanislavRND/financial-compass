import { Injectable } from "@nestjs/common";
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
  return new Date(Number(year), Number(month) - 1, Number(day));
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
}
