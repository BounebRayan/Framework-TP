import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { dtoErrorMessage } from '../errors';

export class userDto {
  @IsNotEmpty({ message: 'A name for the owner is required!' })
  @MinLength(3, { message: dtoErrorMessage(true) })
  name: string;

  @IsNotEmpty({ message: 'An age for the owner is required!' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  age: number;
}
