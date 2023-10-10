import { Request, Response } from 'express';
export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: () => void,
) {
  console.log(
    `A ${req.method} incoming on the ${req.url} endpoint from ${
      req.socket.remoteAddress // or req.ip
    } - ${req.get('user-agent')}`,
  );
  next();
}
