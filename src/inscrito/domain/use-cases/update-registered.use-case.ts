import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Registered } from '../entities/registered.entity';
import { RegisteredRepository } from '../repository/registered.repository';
import { UpdateRegisteredDto } from '../dto/update-registered.dto';

@Injectable()
export class UpdateRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async update(
    id: string,
    input: UpdateRegisteredDto,
  ): Promise<Registered> {
    try {
      return await this.registeredRepository.update(id, input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar Inscrito', error);
    }
  }
}
