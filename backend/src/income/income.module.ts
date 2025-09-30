import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { IncomeController } from "./income.controller";
import { IncomeService } from "./income.service";

@Module({
  controllers: [IncomeController],
  providers: [IncomeService, PrismaService],
  exports: [PrismaService],
})
export class IncomeModule {}
