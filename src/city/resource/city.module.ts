import { Module } from '@nestjs/common';
import { CityRepository } from '../domain/repository/city.repository';
import { CityRepositoryImpl } from '../data-access/infraestructure/repository/city.repository.impl';
@Module({
  controllers: [],
  providers: [
    {
      provide: CityRepository,
      useClass: CityRepositoryImpl,
    },
  ],
  exports: [CityRepository],
})
export class CityModule {}
