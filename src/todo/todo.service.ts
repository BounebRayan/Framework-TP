import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './models/todo';
import { addDto, modifyDto } from './dtos';

@Injectable()
export class TodoService {
  @Inject('UUID') Id;
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
}
