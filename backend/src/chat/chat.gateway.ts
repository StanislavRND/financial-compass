import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { MessagesService } from "../messages/message.service";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private messagesService: MessagesService) {}

  private connectedUsers = new Map<string, number>();

  async handleConnection(client: Socket): Promise<void> {
    console.log(`Client connected: ${client.id}`);
    const userId = client.handshake.auth.userId;
    if (userId) {
      this.connectedUsers.set(client.id, parseInt(userId));
    }

    await Promise.resolve();
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage("join_family")
  handleJoinFamily(client: Socket, familyId: number): void {
    client.join(`family_${familyId}`);
    console.log(`Client ${client.id} joined family ${familyId}`);
  }

  @SubscribeMessage("leave_family")
  handleLeaveFamily(client: Socket, familyId: number): void {
    client.leave(`family_${familyId}`);
    console.log(`Client ${client.id} left family ${familyId}`);
  }

  @SubscribeMessage("send_message")
  async handleMessage(
    client: Socket,
    payload: CreateMessageDto
  ): Promise<void> {
    try {
      const userId = this.connectedUsers.get(client.id);
      if (!userId) {
        client.emit("error", "User not authenticated");
        return;
      }

      const message = await this.messagesService.createMessage(userId, payload);

      this.server.to(`family_${payload.familyId}`).emit("new_message", message);

      client.emit("message_sent", message);
    } catch (error) {
      console.error("Error sending message:", error);
      client.emit("error", "Failed to send message");
    }
  }

  @SubscribeMessage("typing_start")
  handleTypingStart(client: Socket, familyId: number): void {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      client.to(`family_${familyId}`).emit("user_typing", {
        userId,
        typing: true,
      });
    }
  }

  @SubscribeMessage("typing_stop")
  handleTypingStop(client: Socket, familyId: number): void {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      client.to(`family_${familyId}`).emit("user_typing", {
        userId,
        typing: false,
      });
    }
  }
}
