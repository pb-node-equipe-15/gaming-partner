import * as express from 'express';

// import { IUserToken } from '../../interfaces/users'

declare global {
  namespace Express {
    interface Request {
      // user: IUserToken;
    }
  }
}
