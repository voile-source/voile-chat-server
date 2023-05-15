import { UserService } from './../user/user.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9892, { cors: true })
export class EventsGateway {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer() server: Server;

  static userMap: Map<string, Socket> = new Map<string, Socket>();

  @SubscribeMessage('disconnect')
  async handleDisconnect(client: Socket) {
    console.log('断开连接id', client.id);
  }

  // 连接回调
  @SubscribeMessage('connect')
  handleConnection(client: Socket): WsResponse<any> {
    console.log('已经连接成功' + client.id);
    return {
      event: 'connect',
      data: {
        messageFlow: 'down',
        type: 'connect',
        code: 200,
        data: {
          msg: `已经成功连接`,
        },
      },
    };
  }

  @SubscribeMessage('msg')
  handleMessage(client: Socket, data: any) {
    console.log(data);
    if (EventsGateway.userMap.has(data.receiver)) {
      EventsGateway.userMap.get(data.receiver).emit('msg', data);
    }
  }

  @SubscribeMessage('login')
  login(client: Socket, data: any) {
    console.log(data);
    EventsGateway.userMap.set(data.account, client);
  }
}
