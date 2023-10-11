import { ICloudinaryProvider } from '../interfaces/icloudinary.provider';

export class CloudinaryUseCase {
  constructor(private readonly cloudinaryProvider: ICloudinaryProvider) {}
  
  async uploadImage(file: any) {
    return await this.cloudinaryProvider.uploadImage(file);
  }
}
