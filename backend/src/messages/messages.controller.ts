import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./message.service";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto & { userId: number }
  ) {
    return this.messagesService.createMessage(
      createMessageDto.userId,
      createMessageDto
    );
  }

  @Get("family/:familyId")
  async getFamilyMessages(
    @Param("familyId") familyId: string,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 50
  ) {
    return this.messagesService.getFamilyMessages(
      parseInt(familyId),
      page,
      limit
    );
  }
}
