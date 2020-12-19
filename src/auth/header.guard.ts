import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.configService.get<boolean>('inDev')) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const noCSRF = !!request.headers['no-csrf'];
    return noCSRF;
  }
}
