import { ApiProperty } from '@nestjs/swagger';

export class AuthTicketDto {
  @ApiProperty()
  readonly ticket: string;
}
