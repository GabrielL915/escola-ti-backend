import { CreateRegisteredDto } from '../dto/create-registered.dto';
import { UpdateRegisteredDto } from '../dto/update-registered.dto';
import { Registered } from '../entities/registered.entity';

export abstract class RegisteredRepository {
  abstract create(createRegisteredDto: CreateRegisteredDto): Promise<Registered>;

  abstract update(id: string, updateRegisteredDto: UpdateRegisteredDto): Promise<Registered>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(): Promise<Registered[]>;

  abstract findOne(id: string): Promise<Registered>;
}
