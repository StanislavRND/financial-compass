import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("categories-income")
  async getIncomeCategories() {
    return this.categoryService.getIncomeCategories();
  }

  @Get("categories-expense")
  async getExpenseCategories() {
    return this.categoryService.getExpenseCategories();
  }
}
