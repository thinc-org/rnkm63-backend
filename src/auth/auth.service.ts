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
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async verifyTicket(ticket: string, res: Response): Promise<TokenDto> {
    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.BAD_REQUEST);
    }
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
      if (user.data.ouid.slice(0, 2) !== '63') {
        throw new HttpException('Only Freshmen', HttpStatus.FORBIDDEN);
      }
      const uid = user.data.ouid;
      const token = this.jwtService.sign({ user: uid });
      // res.cookie('refreshToken', '');
      // console.log(token);
      return { message: 'Ticket verify', token };
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
  }

  getLogout(): string {
    return 'Logout';
  }
}
