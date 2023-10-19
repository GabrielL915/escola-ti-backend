import { ItemCarrinhoRepository } from "src/item-carrinho/domain/repository/item-carrinho.repository";

export class ItemCarrinhoRepositoryImpl implements ItemCarrinhoRepository {
    async create(input: any) {
        return {
            id: '1',
            id_produto: '1',
            id_carrinho: '1',
            quantidade: 1,
            valor: 1,
        };
    }
}