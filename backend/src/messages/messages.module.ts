import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MessagesService } from "./message.service";
import { MessagesController } from "./messages.controller";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
  exports: [MessagesService, PrismaService],
})
export class MessagesModule {}
