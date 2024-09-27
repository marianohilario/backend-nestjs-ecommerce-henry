import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    `${new Date()} - Estás ejecutando un método ${req.method} en la ruta ${req.url}`,
  );
  next();
}
