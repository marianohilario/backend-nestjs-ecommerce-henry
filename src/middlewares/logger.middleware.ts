import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    `${new Date()} - You are executing a ${req.method} method in the path ${req.url}`,
  );
  next();
}
