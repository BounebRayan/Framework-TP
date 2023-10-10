import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../models/todo';
import { DateColumns } from './Resources';

@Entity('todo')
export class TodoEntity extends DateColumns {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  status: Status;
}
