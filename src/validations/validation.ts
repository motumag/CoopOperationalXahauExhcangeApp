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

// Validate the user login request
export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
     res.status(400).json({
      message: 'Both email and password are required',
    });
    return;
  }
  next();
};
