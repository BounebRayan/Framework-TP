import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { dtoErrorMessage } from '../errors';
import { Type } from 'class-transformer';
import { userDto } from './user.dto';

export class addDto {
  @IsNotEmpty({ message: 'A name is required!' })
  @MinLength(3, { message: dtoErrorMessage(true) })
  @MaxLength(10, { message: dtoErrorMessage(false) })
  name: string;

  @IsNotEmpty({ message: 'A description is required!' })
  @MinLength(15, { message: dtoErrorMessage(true) })
  description: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => userDto)
  owner: userDto;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priority: number;
}
