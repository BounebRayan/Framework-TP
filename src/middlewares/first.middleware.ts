import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(
      `${new Date().toTimeString()}: A ${req.method} incoming on the ${
        req.url
      } endpoint`,
    );
    next();
  }
}
