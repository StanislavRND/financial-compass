import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    name: string,
    login: string,
    password: string,
    isFamily?: boolean,
    invite?: string
  ) {
    const hashed = await bcrypt.hash(password, 10);

    if (isFamily) {
      if (!invite) throw new Error("Инвайт-код обязателен");

      const family = await this.prisma.family.findUnique({
        where: { invite: invite },
      });

      if (!family) throw new Error("Неверный инвайт-код");

      return this.prisma.user.create({
        data: {
          name,
          login,
          password: hashed,
          family: {
            connect: { id: family.id },
          },
        },
      });
    }

    return this.prisma.user.create({
      data: { name, login, password: hashed },
    });
  }

  async login(login: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }

    return user;
  }

  async getCurrentUser(req: Request) {
    const userId = req.cookies.userId;
    if (!userId) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    return user
      ? {
          id: user.id,
          name: user.name,
          login: user.login,
          familyId: user.familyId,
          createdAt: user.createdAt,
        }
      : null;
  }
}
