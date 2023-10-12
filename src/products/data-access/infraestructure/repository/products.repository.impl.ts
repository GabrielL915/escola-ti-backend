import { CreateProductDto } from "src/products/domain/dto/create-product.dto";
import { UpdateProductDto } from "src/products/domain/dto/update-product.dto";
import { Product } from "src/products/domain/entities/product.entity";
import { ProductRepository } from "src/products/domain/repository/products.repository";

export class ProductRepositoryImpl implements ProductRepository {
    async create(input: CreateProductDto): Promise<Product> {
        return Promise.resolve(undefined);
    }
    async findAll(): Promise<Product[]> {
        return Promise.resolve(undefined);
    }
    async findById(id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }
    async update(id: string, input: UpdateProductDto): Promise<Product> {
        return Promise.resolve(undefined);
    }
    async delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}