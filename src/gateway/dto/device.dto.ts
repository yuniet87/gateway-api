import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDeviceDTO {
  @ApiProperty({
    title: 'Device Vendor',
  })
  @IsNotEmpty()
  readonly vendor: string;

  @ApiProperty({
    title: 'Created Date',
  })
  @IsDateString()
  readonly createdDate: Date;

  @ApiProperty({
    title: 'Device status online',
  })
  readonly isOnline: boolean;
}
