import { User } from './user';

export enum Status {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export class Todo {
  private id: string;
  private name: string;
  private description: string;
  private dateDeCreation: Date;
  private status: Status;
  private priority: number;
  private owner: User;
  constructor(
    id: string,
    name: string = '',
    description: string = '',
    owner: User,
    priority: number = 0,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = Status.waiting;
    this.dateDeCreation = new Date();
    this.priority = priority;
    this.owner = new User(owner.name, owner.age);
  }
  public getid(): string {
    return this.id;
  }
  public setname(value: string): void {
    if (value) this.name = value;
  }
  public setdescription(value: string): void {
    if (value) this.description = value;
  }
  public setstatus(value: Status): void {
    if (value) this.status = value;
  }
  public setpriority(value: number): void {
    if (value) this.priority = value;
  }
}
