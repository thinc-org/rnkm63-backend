import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { serializeError } from 'serialize-error';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async verifyTicketWithSSO(ticket: string): Promise<any> {
    try {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel();
      }, 5000);
      const user = await this.httpService
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
      return user.data.ouid;
    } catch (error) {
      const serializedError = serializeError(error);

      if (error?.response?.status === 401) {
        throw new HttpException(
          {
            message: 'Ticket Not Verified',
            error: serializedError,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else if (error?.response?.status === 403) {
        throw new HttpException(
          {
            message: 'Too Many Requests',
            error: serializedError,
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        console.error(
          'Chula SSO Error',
          this.configService.get('sso.url') + '/serviceValidation',
          error.response?.data,
        );
        throw new HttpException(
          {
            message: "Can't connect to Chula SSO",
            error: serializedError,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async verifyTicket(ticket: string, res: Response): Promise<any> {
    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.BAD_REQUEST);
    }
    const uid = await this.verifyTicketWithSSO(ticket);
    if (uid.slice(0, 2) !== '63') {
      throw new HttpException('Only Freshmen', HttpStatus.FORBIDDEN);
    }
    const token = this.jwtService.sign({ uid: uid });
    res.cookie('token', token, {
      httpOnly: true,
      secure: this.configService.get<boolean>('cookie.secure'),
    });
    return { message: 'Ticket verify' };
  }

  getLogout(): string {
    return 'Logout';
  }
}
