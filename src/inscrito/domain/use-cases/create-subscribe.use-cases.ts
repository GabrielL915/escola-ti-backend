import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Subscribe } from '../entities/subscribe.entity';
import { SubscribeRepository } from '../repository/subscribe.repository';
import { CreateSubscribeDto } from '../dto/create-subscribe.dto';

@Injectable()
export class CreateSubscribeUseCase {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  async create(input: CreateSubscribeDto): Promise<Subscribe> {
    try {
      return await this.subscribeRepository.create(input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar Inscrito', error);
    }
  }
}
