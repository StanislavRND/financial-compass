	import { Module } from "@nestjs/common";
	import { PrismaService } from "src/prisma.service";
	import { ExpenseController } from "./expense.controller";
	import { ExpenseService } from "./expense.service";

	@Module({
		controllers: [ExpenseController],
		providers: [ExpenseService, PrismaService],
		exports: [PrismaService],
	})
	export class ExpenseModule {}
