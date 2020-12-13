import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getVerify(): string {
    return 'Check';
  }
  getLogout(): string {
    return 'Logout';
  }
}
