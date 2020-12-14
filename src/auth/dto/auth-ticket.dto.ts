import { ApiProperty } from '@nestjs/swagger';

export class AuthTicketDto {
  @ApiProperty({ description: 'Ticket from sso' })
  readonly ticket: string;
  @ApiProperty({
    description:
      'Status code for mock data will delete after mock sso complete',
    required: false,
    example: 200,
  })
  readonly mockData: number;
}
