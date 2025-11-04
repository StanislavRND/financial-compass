import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
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

  @Get()
  getExpenses(
    @Query("userId") userId: string,
    @Query("familyId") familyId: string | null,
    @Query("filter") filter: "day" | "week" | "month" | "year" = "day",
    @Query("date") dateStr?: string
  ) {
    const date = dateStr ? new Date(dateStr) : undefined;
    return this.expenseService.getExpensesByFilter(
      +userId,
      familyId ? +familyId : null,
      filter,
      date
    );
  }
  @Get("last")
  getLastExpenses(
    @Query("userId") userId: string,
    @Query("familyId") familyId: string | null,
    @Query("filter") filter: "day" | "week" | "month" | "year" = "day",
    @Query("n") n: string = "5"
  ) {
    return this.expenseService.getLastNExpenses(
      +userId,
      familyId ? +familyId : null,
      filter,
      +n
    );
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteExpense(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.expenseService.deleteExpense(id);
  }

  @Post("transfer-to-family")
  async transferExpensesToFamily(
    @Body() body: { userId: number; familyId: number }
  ) {
    return this.expenseService.transferUserExpensesToFamily(
      body.userId,
      body.familyId
    );
  }
}
