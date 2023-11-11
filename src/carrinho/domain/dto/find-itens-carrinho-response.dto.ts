import { IsString } from "class-validator";

export class FindItensCarrinhoResponseDto {
    @IsString()
    id: string;
    @IsString()
    valor_total: number;
    itens: any[];
}