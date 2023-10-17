import { Module } from '@nestjs/common';
import { ItemCarrinhoController } from './item-carrinho.controller';
import { ProductsModule } from '../../products/resource/products.module';
import { ListItemCarrinho } from '../domain/use-cases/list-item-carrinho.use-cases';

@Module({
  imports: [ProductsModule],
  controllers: [ItemCarrinhoController],
  providers: [ListItemCarrinho],
})
export class ItemCarrinhoModule {}

/* 
tenho que criar um carrinho, itemCarrinho.
como seria a parte da logica dele? demonstre em codigo.

irei fornecer algumas entities e alguns metodos

entities
 - carrinho
      export interface Carrinho {
        id: string;
        id_entregador: string;
        id_item_carrinho: string;
        valor: number;
        status: boolean;
      }

 - item-carrinho
      export interface ItemCarrinho {
        id: string;
        id_produto: string;
        quantidade: number;
      }

  - products
      export interface Product {
        id: string;
        nome: string;
        descricao: string;
        valor: number;
        status: boolean; 
      }
  - estoque
      export interface Stock {
        id: string;
        id_produto: string;
        quantidade: number;
      }

metodos
 - carrinho
       -addCarrinho
       -createCarrinho
       -deleteCarrinho
       -finishCompra
     
  - item-carrinho
      -listCarrinhos
      ...(Não sei outros metodos)

  - products
     -create(input: CreateProductDto, image: Express.Multer.File)
     -findAll()
     -findById(id: string)
     -update(id: string, input: UpdateProductDto, image: Express.Multer.File,)
     -delete(id: string)

  -estoque
      -create(input: CreateStockDto)
      -findAll()
      -findById(id: string)
      -update(id: string, input: UpdateStockDto)
      -delete(id: string)


  !Nota: Entregador não é necessarios os metodos, irei trazer o id dele pelor access-token
*/
