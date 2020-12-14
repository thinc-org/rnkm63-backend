import { ApiProperty } from '@nestjs/swagger';

export class AuthTicketDto {
  @ApiProperty({ description: 'Ticket from sso' })
  readonly ticket: string;
}
