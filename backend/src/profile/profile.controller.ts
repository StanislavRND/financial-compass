import { Controller, Get, NotFoundException, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { ProfileService } from "./profile.service";

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post("create-family")
  async createFamily(@Req() req: Request) {
    const userId = Number(req.cookies["userId"]);

    if (!userId) {
      throw new Error("User ID not found in cookies");
    }

    const family = await this.profileService.createFamilyForUser(userId);
    return { message: "Семья создана", inviteCode: family.invite };
  }

  @Get("family")
  async getFamily(@Req() req: Request) {
    const userId = Number(req.cookies["userId"]);
    if (!userId) throw new Error("User ID not found in cookies");

    const family = await this.profileService.getUserFamily(userId);
    if (!family) throw new NotFoundException("Семья не найдена");

    return family;
  }
}
