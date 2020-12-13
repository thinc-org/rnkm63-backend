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

  async getVerify(ticket: string, res) {
    if (!!ticket) {
      new HttpException('Ticket not found', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Ticket Not Verified', HttpStatus.NOT_FOUND);
    }
    if (user.data.ouid.slice(0, 2) !== '63') {
      throw new HttpException('Only Freshmen', HttpStatus.FORBIDDEN);
    }
    console.log(user.data.ouid);
    res.cookie('user', user.data.ouid); //This will be jwt
    res.json('Create Cookie');
  }
  getLogout(): string {
    return 'Logout';
  }
}
