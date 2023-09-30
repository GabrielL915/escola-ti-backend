import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Registered } from '../entities/registered.entity';
import { RegisteredRepository } from '../repository/registered.repository';

@Injectable()
export class FindRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async findAll(): Promise<Registered[]> {
    try {
      return await this.registeredRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar Inscritos', error);
    }
  }

  async findOne(id: string): Promise<Registered> {
    try {
      return await this.registeredRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar Inscrito por id', error);
    }
  }
}
