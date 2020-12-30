import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    GatewayModule,
    MongooseModule.forRoot('mongodb://localhost/gateway', {
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
