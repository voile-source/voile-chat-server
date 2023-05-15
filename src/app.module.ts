import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './config/database';
import { UserModule } from './modules/user/user.module';
import { EventsGateway } from './modules/event/websocket.gatway';

@Module({
  imports: [...DatabaseConfig, UserModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
