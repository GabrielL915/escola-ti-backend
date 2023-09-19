import { CreateObjetivoDto } from '../dto/create-objetivo.dto';
import { Objetivo } from '../entities/objetivo.entity';

export abstract class ObjetivoRepository {
  abstract create(createObjetivoDto: CreateObjetivoDto): Promise<Objetivo>;

  abstract update(id: string, objetivo: Objetivo): Promise<Objetivo>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(): Promise<Objetivo[]>;

  abstract findOne(id: string): Promise<Objetivo>;
}
