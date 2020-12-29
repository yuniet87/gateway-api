import { Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('gateway')
export class GatewayController {
  @Post('/create')
  createPost(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'received',
    });
  }
}
