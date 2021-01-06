import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway } from './interfaces/gateway.interface';
import { CreateGatewayDTO } from './dto/gateway.dto';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel('Gateway') private readonly gatewayModel: Model<Gateway>,
  ) {}

  async getGateways(): Promise<Gateway[]> {
    const gateways = await this.gatewayModel.find().populate('devicesIDs');
    return gateways;
  }

  async getGateway(gatewayID: string): Promise<Gateway> {
    const gateway = await this.gatewayModel
      .findById(gatewayID)
      .populate('devicesIDs');
    return gateway;
  }

  async createGateway(createGatewayDTO: CreateGatewayDTO): Promise<Gateway> {
    const gateway = new this.gatewayModel(createGatewayDTO);
    return await gateway.save();
  }

  async updateGateway(
    gatewayID: string,
    createGatewayDTO: CreateGatewayDTO,
  ): Promise<Gateway> {
    const updatedGateway = await this.gatewayModel.findByIdAndUpdate(
      gatewayID,
      createGatewayDTO,
      { new: true },
    );
    return updatedGateway;
  }

  async deleteGateway(gatewayID: string): Promise<Gateway> {
    const deletedGateway = await this.gatewayModel.findByIdAndDelete(gatewayID);
    return deletedGateway;
  }
}
