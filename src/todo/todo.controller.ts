import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { Status, Todo } from './models/todo';
import { addDto, modifyDto } from './dtos';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { PagingInterceptor } from 'src/interceptors/paging.interceptor';

@Controller('todo')
export class TodoController {
  constructor(private TodoService: TodoService) {}
  @Get()
  @Version('1')
  getToDos(): Todo[] {
    return this.TodoService.getToDos();
  }
  @Get()
  @Version('2')
  getToDosFromDB(): Promise<TodoEntity[]> {
    return this.TodoService.getTodosFromDB();
  }
  @Get()
  @UseInterceptors(PagingInterceptor)
  @Version('3')
  getAll(@Query('page', ParseIntPipe) page: number): Promise<TodoEntity[]> {
    if (!page) page = 1;
    return this.TodoService.getAll(page);
  }
  @Get('/stats/:status?')
  getTodoStatusStats(
    @Param('status') status: Status.actif | Status.waiting | Status.done,
  ): Promise<string | number> {
    return this.TodoService.statusStats(status);
  }
  @Get(':id')
  @Version('1')
  getTodo(@Param('id') id: string): Todo {
    return this.TodoService.getTodo(id);
  }
  @Get(':id')
  @Version('2')
  getTodoFromDB(@Param('id') id: string): Promise<TodoEntity[]> {
    return this.TodoService.getTodoFromDB(id);
  }
  @Post()
  @Version('1')
  addTodo(@Body() body: addDto): Todo {
    return this.TodoService.addTodo(body);
  }
  @Post()
  @Version('2')
  addTodoToDB(@Body() body: addDto): Promise<TodoEntity> {
    return this.TodoService.addTodoToDB(body);
  }
  @Delete(':id')
  @Version('1')
  deleteTodo(@Param('id') id: string): string {
    return this.TodoService.deleteTodo(id);
  }
  @Delete(':id')
  @Version('2')
  deleteTodoFromDB(@Param('id') id: string): Promise<TodoEntity> {
    return this.TodoService.removeTodoFromBD(id);
  }
  @Delete(':id')
  @Version('3')
  softdeleteTodoFromDB(@Param('id') id: string): Promise<TodoEntity> {
    return this.TodoService.softRemoveTodoFromBD(id);
  }
  @Patch('/recover/:id')
  rocoverTodo(@Param('id') id: string): Promise<TodoEntity> {
    return this.TodoService.restoreTodo(id);
  }
  @Patch(':id')
  @Version('1')
  modifyTodo(@Param('id') id: string, @Body() body: modifyDto): Todo {
    return this.TodoService.modifyTodo(id, body);
  }
  @Patch(':id')
  @Version('2')
  modifyTodoInDB(
    @Param('id') id: string,
    @Body() body: modifyDto,
  ): Promise<TodoEntity> {
    return this.TodoService.modifyTodoInBD(id, body);
  }
}
