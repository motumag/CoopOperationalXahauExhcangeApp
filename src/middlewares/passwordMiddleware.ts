import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    // Check if password exists
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword; // Replace the plaintext password with the hashed password

    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword); // Compare the provided password with the hashed password
};
