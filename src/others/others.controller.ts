import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { FusionUpperPipe } from 'src/pipes/fusion-upper.pipe';

@Controller('others')
export class OthersController {
  @Post('/skills')
  @UsePipes(FusionUpperPipe)
  postSkills(@Body() skills): string {
    return skills;
  }
}
