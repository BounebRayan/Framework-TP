import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { addDto } from './add.dto';
import { Status } from '../models/todo';

export class modifyDto extends PartialType(addDto) {
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
