import { Carrinho } from '../entities/carrinho.entity';
import { CreateCarrinhoDto } from '../dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from '../dto/update-carrinho.dto';

export abstract class CarrinhoRepository {
  abstract create(id_motoboy: string): Promise<Carrinho>;/* 
  abstract findAll(): Promise<Carrinho[]>;
  abstract update(id: string, carrinho: UpdateCarrinhoDto): Promise<Carrinho>; */
  abstract findByIdMotoboy(id: string): Promise<Carrinho>;
  abstract findById(id: string): Promise<Carrinho>;
  abstract delete(id: string): Promise<void>;
  abstract addCarrinho(id: string, input: UpdateCarrinhoDto): Promise<Carrinho>;
}
