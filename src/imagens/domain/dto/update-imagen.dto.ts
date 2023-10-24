import { PartialType } from '@nestjs/swagger';
import { CreateImagenDto } from './create-imagen.dto';

export class UpdateImagenDto extends PartialType(CreateImagenDto) {
    url?: string;
    id_produto?: string;
}
