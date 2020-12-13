import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getProfile(): string {
    return 'profile';
  }
  postProfile(): string {
    return 'updated';
  }
}
