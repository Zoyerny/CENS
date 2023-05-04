import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { messageHandlers } from './handler-message';
import { Inject, UseGuards } from '@nestjs/common';
import { SendSocketGateway } from '../send-socket';
import { AuthService } from 'src/auth/auth.service';
import { ServerToClientId } from '../socket.enums';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@WebSocketGateway({
  cors: {
    origin: true,//process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Authorization'],
    credentials: true
  },
})
export class HandlerSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(
    @Inject(SendSocketGateway) private readonly sendSocketGateway: SendSocketGateway,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AccessTokenGuard)
  async handleConnection(client: Socket) {
    let userId = client.handshake.query.userId;
    if (Array.isArray(userId)) {
      userId = userId[0];
    }
    console.log(`clientId : ${userId}, socketId : ${client.id}`)
    this.authService.setOnlineStatus(userId, true);
    this.authService.setSocket(userId, client.id);
    const connectedUsers = await this.authService.getUsers();
    this.sendSocketGateway.sendToAll(ServerToClientId.CONNECTED_USERS_LIST, connectedUsers);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const connectedUsers = await this.authService.getUsers();
    this.sendSocketGateway.sendToAll(ServerToClientId.CONNECTED_USERS_LIST, connectedUsers);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(client: Socket, payload: { type: string; data: any }) {
    console.log("message recu :", payload.type);

    const handler = messageHandlers[payload.type];
    if (handler) {
      handler(client, payload.data, this.sendSocketGateway, this.authService);
    } else {
      console.log(`Unhandled message type: ${payload.type}`);
    }
  }
}
