import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ description: 'Message from API' })
  readonly message: string;

  @ApiProperty({ description: 'Token for use in headers' })
  readonly token?: string;
}
