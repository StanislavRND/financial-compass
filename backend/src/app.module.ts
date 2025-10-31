import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ChatModule } from "./chat/chat.module";
import { ExpenseModule } from "./expense/expense.module";
import { IncomeModule } from "./income/income.module";
import { MessagesModule } from "./messages/messages.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    CategoryModule,
    ExpenseModule,
    IncomeModule,
    ChatModule,
    MessagesModule,
  ],
})
export class AppModule {}
