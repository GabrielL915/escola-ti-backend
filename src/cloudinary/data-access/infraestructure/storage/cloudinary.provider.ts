import { v2 } from 'cloudinary';
import { ICloudinaryProvider } from '../../../domain/interfaces/icloudinary.provider';

export class CloudinaryProvider implements ICloudinaryProvider {
    constructor() {
        v2.config({
            cloud_name: 'Your cloud name',
            api_key: 'Your api key',
            api_secret: 'Your api secret',
        });
    }

  async uploadImage(file: any): Promise<string> {
    const { url } = await v2.uploader.upload(file.path);
    return url;
  }
}
