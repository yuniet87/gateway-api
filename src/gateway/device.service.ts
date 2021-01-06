import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './interfaces/device.interface';
import { CreateDeviceDTO } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel('Device') private readonly deviceModel: Model<Device>,
  ) {}

  async getDevices(): Promise<Device[]> {
    return await this.deviceModel.find();
  }

  async getDevice(id: string): Promise<Device> {
    return await this.deviceModel.findById(id);
  }

  async createDevice(createDeviceDTO: CreateDeviceDTO): Promise<Device> {
    const device = new this.deviceModel(createDeviceDTO);
    return await device.save();
  }

  async updateDevice(
    id: string,
    createDeviceDTO: CreateDeviceDTO,
  ): Promise<Device> {
    return await this.deviceModel.findByIdAndUpdate(id, createDeviceDTO, {
      new: true,
    });
  }

  async deleteDevice(deviceID: string): Promise<Device> {
    return await this.deviceModel.findByIdAndDelete(deviceID);
  }
}
