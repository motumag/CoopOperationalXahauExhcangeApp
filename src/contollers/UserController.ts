import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

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

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'No user found with this email' });
      return;
    }

    // Validate the password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || '2371974832747978374', {
      expiresIn: '1h',
    });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id },
    });
  } catch (error) {
    next(error);
  }
};
