// global.d.ts
declare namespace Express {
    export interface Request {
      user?: any;  // Make `user` optional to avoid issues
    }
  }