// validations/validation.ts
import { Request, Response, NextFunction } from 'express';

export const validateUserRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { firstName, lastName, username, email,password } = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    res.status(400).json({
      message: 'All fields are required: firstName, lastName, username, email',
    });
    return; 
  }
  next();
};
