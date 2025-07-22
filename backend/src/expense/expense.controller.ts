import { Body, Controller, Post } from "@nestjs/common";
import { ExpenseService } from "./expense.service";

class CreateExpenseDto {
  sum!: number;
  categoryId!: number;
  date!: string;
	userId!: number;
  familyId?: number;
}

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.createExpense(createExpenseDto);
  }
}
