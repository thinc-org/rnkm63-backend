import { Request } from 'express';

export type RequestWithUserID = Request & {
  user: {
    uid: string;
  };
};
