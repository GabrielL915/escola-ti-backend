import { CreateObjectiveDto } from '../dto/create-objective.dto';
import { Objective } from '../entities/objetivo.entity';

export abstract class ObjectiveRepository {
  abstract create(createObjectiveDto: CreateObjectiveDto): Promise<Objective>;

  abstract update(id: string, Objective: Objective): Promise<Objective>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(): Promise<Objective[]>;

  abstract findOne(id: string): Promise<Objective>;
}
