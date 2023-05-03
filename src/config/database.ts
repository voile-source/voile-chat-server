import { TypeOrmModule } from '@nestjs/typeorm';

export default [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '47.109.63.103',
    port: 3306,
    username: 'root',
    password: 'Ww2503063984.',
    database: 'chat',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  }),
];
