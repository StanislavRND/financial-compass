import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getIncomeCategories() {
    return this.prisma.categoryIncome.findMany();
  }

  async getExpenseCategories() {
    return this.prisma.categoryExpense.findMany();
  }
}
