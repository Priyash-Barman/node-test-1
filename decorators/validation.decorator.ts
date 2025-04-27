import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export function validate_payload(dto: any) {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
      const inputData = plainToClass(dto, req.body);
      const errors = await validate(inputData);

      if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid data', errors });
      }

      return originalMethod(req, res, next);
    };
  };
}
