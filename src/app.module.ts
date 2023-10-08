import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { OthersController } from './others/others.controller';

@Module({
  imports: [TodoModule, CommonModule],
  controllers: [OthersController],
})
export class AppModule {}
