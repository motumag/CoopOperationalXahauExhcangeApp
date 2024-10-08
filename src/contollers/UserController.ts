import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    // Create a new user instance
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    // hash the password
    await user.setPassword(password); 
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
