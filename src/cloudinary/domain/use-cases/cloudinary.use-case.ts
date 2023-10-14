import { Injectable } from '@nestjs/common';
import { ICloudinaryProvider } from '../interfaces/icloudinary.provider';

@Injectable()
export class CloudinaryUseCase {
  constructor(private readonly cloudinaryProvider: ICloudinaryProvider) {}
  
  async uploadImage(file: Express.Multer.File) {
    return await this.cloudinaryProvider.uploadImage(file);
  }
}
