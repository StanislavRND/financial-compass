import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("categories")
  async getCategories() {
    const categories = await this.categoryService.getCategories();
    return categories;
  }
}
