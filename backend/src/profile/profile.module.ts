import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
  exports: [PrismaService],
})
export class ProfileModule {}
