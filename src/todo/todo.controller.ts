import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo } from './models/todo';
import { addDto, modifyDto } from './dtos';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private TodoService: TodoService) {}
  @Get()
  getToDos(): Todo[] {
    return this.TodoService.getToDos();
  }
  @Get(':id')
  getTodo(@Param('id') id: string): Todo {
    return this.TodoService.getTodo(id);
  }
  @Post()
  addTodo(@Body() body: addDto): Todo {
    return this.TodoService.addTodo(body);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): string {
    return this.TodoService.deleteTodo(id);
  }
  @Patch(':id')
  modifyTodo(@Param('id') id: string, @Body() body: modifyDto): Todo {
    return this.TodoService.modifyTodo(id, body);
  }
}
