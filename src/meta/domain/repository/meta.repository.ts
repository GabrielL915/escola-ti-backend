import { CreateMetaDto } from '../dto/create-meta.dto';
import { UpdateMetaDto } from '../dto/update-meta.dto';
import { Meta } from '../entities/meta.entity';

export abstract class MetaRepository {
  abstract create(createMetaDto: CreateMetaDto): Promise<Meta>;

  abstract update(id: string, input: UpdateMetaDto): Promise<Meta>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(): Promise<Meta[]>;

  abstract findOne(id: string): Promise<Meta>;
}
