import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async verifyTicket(ticket: string, res: Response) {
    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.BAD_REQUEST);
    }
    let user;
    try {
      let source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel();
      }, 5000);
      user = await this.httpService
        .get(this.configService.get('sso.url') + '/serviceValidation', {
          headers: {
            DeeAppId: this.configService.get('sso.appId'),
            DeeAppSecret: this.configService.get('sso.appSecret'),
            DeeTicket: ticket,
          },
          cancelToken: source.token,
        })
        .toPromise();
      clearTimeout(timeout);
    } catch (error) {
      if (error.response.status === 401) {
        throw new HttpException(
          'Ticket Not Verified',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else if (error.response.status === 403) {
        throw new HttpException(
          'Too Many Requests',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new HttpException(
          "Can't connect to Chula SSO",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    if (user.data.ouid.slice(0, 2) !== '63') {
      throw new HttpException('Only Freshmen', HttpStatus.FORBIDDEN);
    }
    console.log(user.data.ouid);
    res.cookie('token', user.data.ouid); //This will be jwt
    return { message: 'Create Cookie' };
  }

  getLogout(): string {
    return 'Logout';
  }
}
