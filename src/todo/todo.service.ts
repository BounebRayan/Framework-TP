import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Status, Todo } from './models/todo';
import { addDto, modifyDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  @Inject('UUID') Id;
  constructor(
    @InjectRepository(TodoEntity)
    private TodoRepository: Repository<TodoEntity>,
  ) {}
  private todos: Todo[] = [];
  getToDos(): Todo[] {
    return this.todos;
  }
  getTodo(id: string): Todo {
    return this.todos.find((todo) => todo.getid() == id);
  }
  addTodo(body: addDto): Todo {
    const aux = new Todo(
      this.Id(),
      body.name,
      body.description,
      body.owner,
      body.priority,
    );
    this.todos.push(aux);
    console.log(aux);
    return aux;
  }
  deleteTodo(id: string): string {
    this.todos = this.todos.filter((todo) => todo.getid() != id);
    return `The Todo with ID ${id} has been removed`;
  }
  modifyTodo(id: string, body: modifyDto): Todo {
    const aux = this.todos.find((todo) => todo.getid() == id);
    if (!aux) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    aux.setname(body.name);
    aux.setdescription(body.description);
    aux.setstatus(body.status);
    return aux;
  }
  async addTodoToDB(body: addDto): Promise<TodoEntity> {
    return this.TodoRepository.save(body);
  }
  async getTodosFromDB(): Promise<TodoEntity[]> {
    return await this.TodoRepository.find();
  }
  async getTodoFromDB(id: string): Promise<TodoEntity[]> {
    const aux = await this.TodoRepository.findBy({ id: id });
    if (!aux) {
      throw new NotFoundException("Couldn't find any Todo by that id 🤔");
    }
    return aux;
  }
  async modifyTodoInBD(id: string, body: modifyDto): Promise<TodoEntity> {
    const aux = await this.TodoRepository.preload({ id, ...body });
    return await this.TodoRepository.save(aux);
  }
  async removeTodoFromBD(id: string): Promise<TodoEntity> {
    const aux = await this.TodoRepository.findOneBy({ id });
    if (!aux) {
      throw new NotFoundException("Couldn't find any Todo by that id 🤔");
    }
    return await this.TodoRepository.remove(aux);
  }
  async softRemoveTodoFromBD(id: string): Promise<TodoEntity> {
    const aux = await this.TodoRepository.findOneBy({ id });
    if (!aux) {
      throw new NotFoundException("Couldn't find any Todo by that id 🤔");
    }
    return await this.TodoRepository.softRemove(aux);
  }
  async restoreTodo(id: string): Promise<TodoEntity> {
    const aux = await this.TodoRepository.findOneBy({ id });
    return await this.TodoRepository.recover(aux);
  }
  async statusStats(status?: Status.actif | Status.waiting | Status.done) {
    if (status)
      return await this.TodoRepository.countBy({
        status: status,
      });
    const actifTodos = await this.TodoRepository.countBy({
      status: Status.actif,
    });
    const waitingTodos = await this.TodoRepository.countBy({
      status: Status.waiting,
    });
    const doneTodos = await this.TodoRepository.countBy({
      status: Status.done,
    });
    return `${actifTodos} actif Todos, ${waitingTodos} waiting Todos, ${doneTodos} done Todos`;
  }
}
