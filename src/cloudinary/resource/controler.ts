import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryUseCase } from '../domain/use-cases/cloudinary.use-case';

@Controller('upload')
export class UploadController {

    constructor(private readonly cloudinaryUseCase: CloudinaryUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryUseCase.uploadImage(file);
  }
}
