import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "generated/prisma";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body()
    body: {
      name: string;
      login: string;
      password: string;
      isFamily?: boolean;
      invite?: string;
    },
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const user = await this.authService.register(
        body.name,
        body.login,
        body.password,
        body.isFamily,
        body.invite
      );

      res.cookie("userId", user.id, {
        httpOnly: true,
        sameSite: "lax",
      });

      return { message: "Успешная регистрация", user };
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "Пользователь с таким логином уже существует"
        );
      }

      throw error;
    }
  }

  @Post("login")
  async login(
    @Body() body: { login: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.login(body.login, body.password);
    res.cookie("userId", user.id, {
      httpOnly: true,
      sameSite: "lax",
    });

    return { message: "Успешная вход", user };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("userId");
    return { message: "Выход выполнен" };
  }

  @Get("me")
  async getProfile(@Req() req: Request) {
    const user = await this.authService.getCurrentUser(req);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
