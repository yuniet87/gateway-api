import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Delete,
  Query,
  Put,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateGatewayDTO } from './dto/gateway.dto';
import { GatewayService } from './gateway.service';
import { Gateway } from './interfaces/gateway.interface';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('gateway')
@ApiResponse({ status: 400, description: 'Request Error' })
@ApiResponse({ status: 500, description: 'Internal Error' })
@Controller('gateway')
@UseInterceptors(LoggingInterceptor)
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiOperation({ summary: 'Get all gateways' })
  getGateways(): Promise<Gateway[]> {
    return this.gatewayService.getGateways();
  }

  @Get('/:gatewayID')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Gateway does not exists' })
  @ApiOperation({ summary: 'Get a gateway by ID' })
  getGateway(@Param('gatewayID') gatewayID: string): Promise<Gateway> {
    return this.gatewayService
      .getGateway(gatewayID)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Gateway does not exists',
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch(() => {
        throw new HttpException(
          'Gateway does not exists',
          HttpStatus.NOT_FOUND,
        );
      });
  }

  @Post('/create')
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiOperation({ summary: 'Add gateway' })
  createGateway(
    @Body(ValidationPipe) createGatewayDTO: CreateGatewayDTO,
  ): Promise<Gateway> {
    return this.gatewayService
      .createGateway(createGatewayDTO)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Error inserting',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      })
      .catch((e) => {
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
  @ApiResponse({ status: 404, description: 'Gateway does not exists' })
  @ApiOperation({ summary: 'Update gateway by ID' })
  updateGateway(
    @Body() createGatewayDTO: CreateGatewayDTO,
    @Query('gatewayID') gatewayID: string,
  ): Promise<Gateway> {
    return this.gatewayService
      .updateGateway(gatewayID, createGatewayDTO)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Gateway does not exists',
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch(() => {
        throw new HttpException(
          'Gateway does not exists',
          HttpStatus.NOT_FOUND,
        );
      });
  }

  @Delete('/delete')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Gateway does not exists' })
  @ApiOperation({ summary: 'Delete a gateway by ID' })
  deleteGateway(@Query('gatewayID') gatewayID: string): Promise<Gateway> {
    return this.gatewayService
      .deleteGateway(gatewayID)
      .then((result) => {
        if (result) return result;
        else
          throw new HttpException(
            'Gateway does not exists',
            HttpStatus.NOT_FOUND,
          );
      })
      .catch(() => {
        throw new HttpException(
          'Gateway does not exists',
          HttpStatus.NOT_FOUND,
        );
      });
  }
}
