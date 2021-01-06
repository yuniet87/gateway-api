import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaySchema } from './schemas/gateway.schema';
import { DeviceSchema } from './schemas/device.schema';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

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
  controllers: [GatewayController, DeviceController],
  providers: [GatewayService, DeviceService],
})
export class GatewayModule {}
