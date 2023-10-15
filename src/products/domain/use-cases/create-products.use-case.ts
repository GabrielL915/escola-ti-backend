import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CloudinaryUseCase } from '../../../cloudinary/domain/use-cases/cloudinary.use-case';
import { ProductRepository } from '../repository/products.repository';
import { CreateImagenUseCase } from '../../../imagens/domain/use-cases/create-imagem.use-case';
import { CreateStockUseCase } from '../../../stock/domain/use-cases/create-stock.use-case';

@Injectable()
export class CreateProductsUseCase {
  constructor(
    private readonly cloudinaryUseCase: CloudinaryUseCase,
    private readonly createImagenUseCase: CreateImagenUseCase,
    private readonly createStockUseCase: CreateStockUseCase,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(input: CreateProductDto, image: Express.Multer.File) {
    const product = await this.productRepository.create({
      nome: input.nome,
      descricao: input.descricao,
      valor: input.valor,
    });
    const stock = await this.createStockUseCase.create({
      quantidade: input.quantidade,
      id_produto: product.id,
    });
    const imageUrl = await this.cloudinaryUseCase.uploadImage(image);
    const salvarImagem = await this.createImagenUseCase.create({
      url: imageUrl,
      id_produto: product.id,
    });
    console.log(salvarImagem);
    console.log(stock);
    return { ...product, imageUrl, stock };
  }
}
