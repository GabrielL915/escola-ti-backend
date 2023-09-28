import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from '../domain/repository/campaign.repository';
import { CampaignRepositoryImpl } from '../data-access/repository/campaign.repository.impl';
import { CreateCampaignUseCase } from '../domain/use-cases/create-campaign.use-cases';
import { UpdateCampaignUseCase } from '../domain/use-cases/update-campaign.use-case';
import { DeleteCampaignUseCase } from '../domain/use-cases/delete-campaign.use-cases';
import { FindCampaignUseCase } from '../domain/use-cases/find-campaign.use-cases';

@Module({
  controllers: [CampaignController],
  providers: [
    {
      provide: CampaignRepository,
      useClass: CampaignRepositoryImpl,
    },
    CreateCampaignUseCase,
    UpdateCampaignUseCase,
    DeleteCampaignUseCase,
    FindCampaignUseCase,
  ],
})
export class CampaignModule {}
