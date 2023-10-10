import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { OthersController } from './others/others.controller';
import { FirstMiddleware } from './middlewares/first.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';

@Module({
  imports: [
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [TodoEntity],
      synchronize: true,
    }),
  ],
  controllers: [OthersController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes('');
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
