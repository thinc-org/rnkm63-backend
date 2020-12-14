import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async verifyTicket(ticket: string, res) {
    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.BAD_REQUEST);
    }
    let user;
    try {
      user = await this.httpService
        .get(this.configService.get('sso.url') + '/serviceValidation', {
          headers: {
            DeeAppId: this.configService.get('sso.appId'),
            DeeAppSecret: this.configService.get('sso.appSecret'),
            DeeTicket: ticket,
          },
        })
        .toPromise();
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        throw new HttpException('Ticket Not Verified', HttpStatus.NOT_FOUND);
      } else if (error.status === 403) {
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
    res.json('Create Cookie');
  }

  mockVerifyTicket(status, res) {
    if (status === '200') {
      res.cookie('token', 'TEST');
      res.json('Create Cookie');
    } else if (status === '400') {
      throw new HttpException('Ticket not found', HttpStatus.BAD_REQUEST);
    } else if (status === '403') {
      throw new HttpException('Only Freshmen', HttpStatus.FORBIDDEN);
    } else if (status === '404') {
      throw new HttpException('Ticket Not Verified', HttpStatus.NOT_FOUND);
    } else if (status === '500') {
      throw new HttpException(
        "Can't connect to Chula SSO",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (status === '429') {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    } else {
      res.json('No status found');
    }
  }

  getLogout(): string {
    return 'Logout';
  }
}
