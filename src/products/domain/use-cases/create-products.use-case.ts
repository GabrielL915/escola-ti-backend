import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CloudinaryUseCase } from '../../../cloudinary/domain/use-cases/cloudinary.use-case';
import { ProductRepository } from '../repository/products.repository';
@Injectable()
export class CreateProductsUseCase {
  constructor(
    private readonly cloudinaryUseCase: CloudinaryUseCase,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(input: CreateProductDto, image: Express.Multer.File) {
    const product = await this.productRepository.create(input);
    const imageUrl = await this.cloudinaryUseCase.uploadImage(image);
    const salvarImagem = console.log(imageUrl, product.id);

    return { ...product, imageUrl };
  }
}
