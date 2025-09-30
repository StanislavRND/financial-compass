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
import { IncomeService } from "./income.service";

class CreateIncomeDto {
  sum!: number;
  categoryId!: number;
  date!: string;
  userId!: number;
  familyId?: number;
}

@Controller("income")
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  createIncome(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomeService.createIncome(createIncomeDto);
  }

  @Get()
  getIncome(
    @Query("userId") userId: string,
    @Query("familyId") familyId: string | null,
    @Query("filter") filter: "day" | "week" | "month" | "year" = "day",
    @Query("date") dateStr?: string
  ) {
    const date = dateStr ? new Date(dateStr) : undefined;
    return this.incomeService.getIncomeByFilter(
      +userId,
      familyId ? +familyId : null,
      filter,
      date
    );
  }

  @Get("last")
  getLastIncome(
    @Query("userId") userId: string,
    @Query("familyId") familyId: string | null,
    @Query("filter") filter: "day" | "week" | "month" | "year" = "day",
    @Query("n") n: string = "5"
  ) {
    return this.incomeService.getLastNIncome(
      +userId,
      familyId ? +familyId : null,
      filter,
      +n
    );
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteIncome(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.incomeService.deleteIncome(id);
  }
}
