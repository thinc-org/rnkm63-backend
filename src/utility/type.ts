import { Request } from 'express';

export type RequestWithUserID = Request & {
  user: {
    uid: string;
  };
};

export interface FacultyName {
  facultyEn: string;
  facultyTh: string;
}
