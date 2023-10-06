import { CreateCityDto } from "../dto/create-city.dto";
import { City } from "../entities/city.entity";

export abstract class CityRepository {
  abstract create(input: CreateCityDto): Promise<City>;
}