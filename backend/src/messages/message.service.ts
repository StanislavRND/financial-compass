import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";

export class MessageResponseDto {
  id!: number;
  content!: string;
  userId!: number;
  familyId!: number;
  createdAt!: Date;
  user!: {
    id: number;
    name: string;
    login: string;
  };
}

export type MessageWithUser = {
  id: number;
  content: string;
  userId: number;
  familyId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
    login: string;
  };
};

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(
    userId: number,
    createMessageDto: CreateMessageDto
  ): Promise<MessageResponseDto> {
    const message = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        userId: userId,
        familyId: createMessageDto.familyId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            login: true,
          },
        },
      },
    });

    const typedMessage: MessageWithUser = {
      id: message.id,
      content: message.content,
      userId: message.userId,
      familyId: message.familyId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      user: {
        id: message.user.id,
        name: message.user.name,
        login: message.user.login,
      },
    };

    return this.toResponseDto(typedMessage);
  }

  async getFamilyMessages(
    familyId: number,
    page: number = 1,
    limit: number = 50
  ): Promise<MessageResponseDto[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const messages = await this.prisma.message.findMany({
      where: { familyId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            login: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: (pageNum - 1) * limit,
      take: limitNum,
    });

    const typedMessages: MessageWithUser[] = messages.map((message) => ({
      id: message.id,
      content: message.content,
      userId: message.userId,
      familyId: message.familyId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      user: {
        id: message.user.id,
        name: message.user.name,
        login: message.user.login,
      },
    }));

    return typedMessages.map((message) => this.toResponseDto(message));
  }

  private toResponseDto(message: MessageWithUser): MessageResponseDto {
    return {
      id: message.id,
      content: message.content,
      userId: message.userId,
      familyId: message.familyId,
      createdAt: message.createdAt,
      user: {
        id: message.user.id,
        name: message.user.name,
        login: message.user.login,
      },
    };
  }
}
