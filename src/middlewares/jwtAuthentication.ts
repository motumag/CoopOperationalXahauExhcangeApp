// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }
//   try {
//     const secretKey = process.env.JWT_SECRET || '2371974832747978374';
//     const decoded = jwt.verify(token, secretKey); 
//     req.user = decoded;  
//     next(); 
//   } catch (error) {
//     return res.status(400).json({ message: 'Invalid token.' });
//   }
// };
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = '2371974832747978374';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   if (!token) {
     throw new Error();
   }
   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }}
