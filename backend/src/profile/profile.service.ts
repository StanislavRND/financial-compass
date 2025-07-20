import { Injectable } from "@nestjs/common";
import { Family } from "generated/prisma";
import { PrismaService } from "src/prisma.service";
import { generateUniqueInviteCode } from "src/utils/invite";
@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createFamilyForUser(userId: number): Promise<Family> {
    const invite = generateUniqueInviteCode();

    const family = await this.prisma.family.create({ data: { invite } });

    await this.prisma.user.update({
      where: { id: userId },
      data: { familyId: family.id },
    });

    return family;
  }

  async getUserFamily(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        family: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                login: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!user?.family) {
      return null;
    }

    return {
      invite: user.family.invite,
      members: user.family.users,
    };
  }
}
