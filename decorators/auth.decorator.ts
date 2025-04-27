import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function login_required(target: any, key: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value;

  descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded: any = jwt.verify(token, (process.env.JWT_SECRET as string));
      (req as any).user_id = decoded.user_id;
      return originalMethod(req, res, next);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
