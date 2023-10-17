import { Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';

@Injectable()
export class FinishCompraCarrinhoUseCase {
    async finishCompra(id: string) {
        return 'Compra finalizada com sucesso!'
    }
}