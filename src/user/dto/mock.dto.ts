import { ApiProperty } from '@nestjs/swagger';

export class MockUserDTO {
  @ApiProperty({
    description:
      '0=No Data, 1=NameWrong, 2=ImgWrong, 3=ImgNameWrong, 4=Pass, 5=Comfirmed',
  })
  mode: number;
}
