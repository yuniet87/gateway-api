import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  NotFoundException,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CreateGatewayDTO } from './dto/gateway.dto';
import { GatewayService } from './gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Post('/create')
  async createGateway(@Res() res, @Body() createGatewayDTO: CreateGatewayDTO) {
    const gateway = await this.gatewayService.createGateway(createGatewayDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Gateway Successfully Created',
      gateway,
    });
  }

  @Get('/')
  async getGateways(@Res() res) {
    const gateways = await this.gatewayService.getGateways();
    res.status(HttpStatus.OK).json({
      gateways,
    });
  }

  @Get('/:gatewayID')
  async getGateway(@Res() res, @Param('gatewayID') gatewayID) {
    const gateway = await this.gatewayService.getGateway(gatewayID);
    if (!gateway) throw new NotFoundException('Gateway does not exists');
    return res.status(HttpStatus.OK).json(gateway);
  }

  @Delete('/delete')
  async deleteGateway(@Res() res, @Query('gatewayID') gatewayID) {
    const gatewayDeleted = await this.gatewayService.deleteGateway(gatewayID);
    if (!gatewayDeleted) throw new NotFoundException('Gateway does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Gateway Successfully Deleted',
      gatewayDeleted,
    });
  }

  @Put('/update')
  async updateGateway(
    @Res() res,
    @Body() createGatewayDTO: CreateGatewayDTO,
    @Query('productID') productID,
  ) {
    const updatedGateway = await this.gatewayService.updateGateway(
      productID,
      createGatewayDTO,
    );
    if (!updatedGateway) throw new NotFoundException('Gateway does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Gateway Updated Successfully',
      updatedGateway,
    });
  }
}
