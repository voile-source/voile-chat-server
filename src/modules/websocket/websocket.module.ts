import { MyWebSocketGateway } from './websocket.gatway';
import { Module } from '@nestjs/common';

@Module({
  providers: [MyWebSocketGateway],
})
export class WebSocketModule {}
