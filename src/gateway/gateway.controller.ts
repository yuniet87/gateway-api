import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateGatewayDTO } from './dto/gateway.dto';

@Controller('gateway')
export class GatewayController {
  @Post('/create')
  createPost(@Res() res, @Body() createGatewayDTO: CreateGatewayDTO) {
    // console.log(createGatewayDTO);
    return res.status(HttpStatus.OK).json({
      message: 'received',
    });
  }
}
