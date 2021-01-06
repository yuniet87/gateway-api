import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { DeviceService } from './device.service';
import { Device } from './interfaces/device.interface';
import { CreateDeviceDTO } from './dto/device.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('device')
@ApiResponse({ status: 400, description: 'Request Error' })
@ApiResponse({ status: 500, description: 'Internal Error' })
@Controller('device')
@UseInterceptors(LoggingInterceptor)
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiOperation({ summary: 'Get all devices' })
  getDevices(): Promise<Device[]> {
    return this.deviceService.getDevices();
  }

  @Get('/:deviceID')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Device does not exists' })
  @ApiOperation({ summary: 'Get a device by ID' })
  getDevice(@Param('deviceID') deviceID: string): Promise<Device> {
    return this.deviceService
      .getDevice(deviceID)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Device does not exists',
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch(() => {
        throw new HttpException('Device does not exists', HttpStatus.NOT_FOUND);
      });
  }

  @Post('/create')
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiOperation({ summary: 'Add device' })
  createDevice(
    @Body(ValidationPipe) createDeviceDTO: CreateDeviceDTO,
  ): Promise<Device> {
    return this.deviceService
      .createDevice(createDeviceDTO)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Error inserting.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      })
      .catch((e) => {
        console.log(e);
        const err = e.errors;
        const sanitize = err[Object.keys(err)[0]];
        throw new HttpException(
          sanitize.properties.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  @Put('/update')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Device does not exists' })
  @ApiOperation({ summary: 'Update device by ID' })
  updateDevice(
    @Body() createDeviceDTO: CreateDeviceDTO,
    @Query('deviceID') deviceID: string,
  ): Promise<Device> {
    return this.deviceService
      .updateDevice(deviceID, createDeviceDTO)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Device does not exists',
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch(() => {
        throw new HttpException('Device does not exists', HttpStatus.NOT_FOUND);
      });
  }

  @Delete('/delete')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Device does not exists' })
  @ApiOperation({ summary: 'Delete a device by ID' })
  deleteDevice(@Query('deviceID') deviceID: string): Promise<Device> {
    return this.deviceService
      .deleteDevice(deviceID)
      .then((result) => {
        if (result) return result;
        else
          throw new HttpException(
            'Device does not exists',
            HttpStatus.NOT_FOUND,
          );
      })
      .catch(() => {
        throw new HttpException('Device does not exists', HttpStatus.NOT_FOUND);
      });
  }
}
