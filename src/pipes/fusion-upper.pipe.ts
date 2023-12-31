import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FusionUpperPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.skills) throw new BadRequestException();
    const aux = value.skills
      .map((skill: string) => skill.charAt(0).toUpperCase() + skill.slice(1))
      .join('-');
    return aux;
  }
}
