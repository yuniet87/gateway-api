import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIP, IsNotEmpty, IsArray } from 'class-validator';
import { CreateDeviceDTO } from './device.dto';

export class CreateGatewayDTO {
  @ApiProperty({
    title: 'The serial Number of the Gateway',
  })
  @IsNotEmpty()
  @IsString()
  readonly serialNumber: string;

  @ApiProperty({
    title: 'The human-readable name of the Gateway',
  })
  @IsString()
  @IsNotEmpty()
  readonly hrName: string;

  @ApiProperty({
    title: 'IPv4 Address of the Gateway',
  })
  @IsIP('4')
  readonly ipAddress: string;

  @ApiProperty({
    type: Array,
  })
  @IsArray()
  readonly devicesIDs: CreateDeviceDTO[];
}
