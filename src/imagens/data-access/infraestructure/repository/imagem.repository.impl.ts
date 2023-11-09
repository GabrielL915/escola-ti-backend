import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { ImagemRepository } from '../../../domain/repository/imagem.repository';
import { CreateImagenDto } from '../../../domain/dto/create-imagen.dto';
import { UpdateImagenDto } from '../../../domain/dto/update-imagen.dto';
import { Imagen } from '../../../domain/entities/imagen.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class ImagemRepositoryImpl implements ImagemRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(input: CreateImagenDto): Promise<Imagen> {
    try {
      const [imagen] = await this.knex('imagem').insert(input).returning('*');
      return imagen;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar a imagem no banco',
        error,
      );
    }
  }

  async findAll(): Promise<Imagen[]> {
    try {
      return await this.knex('imagem').select('*');
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar as imagens no banco',
        error,
      );
    }
  }

  async findById(id: string): Promise<Imagen> {
    try {
      const [imagen] = await this.knex('imagem')
        .select('*')
        .where({ id_origem: id });
      return imagen;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar a imagem no banco',
        error,
      );
    }
  }

  async update(id: string, input: UpdateImagenDto): Promise<Imagen> {
    try {
      const [imagen] = await this.knex('imagem')
        .where({ id_origem: id })
        .update(input)
        .returning('*');
      return imagen;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar a imagem no banco',
        error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('imagem').where({ id_origem: id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar a imagem no banco',
        error,
      );
    }
  }
}
