import { Module } from '@nestjs/common';
import { CloudinaryUseCase } from '../domain/use-cases/cloudinary.use-case';
import { CloudinaryProvider } from '../data-access/infraestructure/storage/cloudinary.provider';
import { UploadController } from './controler';
import { ICloudinaryProvider } from '../domain/interfaces/icloudinary.provider';
@Module({
  controllers: [UploadController],
  providers: [
    CloudinaryUseCase,
    {
      provide: ICloudinaryProvider,
      useClass: CloudinaryProvider,
    }
  ],
})
export class CloudinaryModule {}
