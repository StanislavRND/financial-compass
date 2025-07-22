import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ExpenseModule } from "./expense/expense.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [AuthModule, ProfileModule, CategoryModule, ExpenseModule],
})
export class AppModule {}
