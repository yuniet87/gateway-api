import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaySchema } from './schemas/gateway.schema';
import { DeviceSchema } from './schemas/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Device',
        schema: DeviceSchema,
      },
      {
        name: 'Gateway',
        schema: GatewaySchema,
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
