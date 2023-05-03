import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './config/database';
import { UserModule } from './modules/user/user.module';
import { WebSocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [...DatabaseConfig, UserModule, WebSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
