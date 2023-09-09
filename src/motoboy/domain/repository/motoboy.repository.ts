import { UpdateMotoboyDto } from "../dto/update-motoboy.dto";
import { Motoboy } from "../entities/motoboy.entity";

export abstract class MotoboyRepository {
    abstract update(id: string, input: UpdateMotoboyDto): Promise<Motoboy>;
}