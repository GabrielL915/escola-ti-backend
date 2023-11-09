import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CloudinaryUseCase } from '../../../cloudinary/domain/use-cases/cloudinary.use-case';
import { IMAGEN_UPDATE_PROVIDER } from 'src/shared/constants/injection-tokens';
import { IUpdate } from 'src/shared/interfaces/update.interface';
import { UpdateImagenDto } from 'src/imagens/domain/dto/update-imagen.dto';
import { Imagen } from 'src/imagens/domain/entities/imagen.entity';

@Injectable()
export class UpdateCampaignUseCase {
  constructor(
    private readonly cloudinaryUseCase: CloudinaryUseCase,
    private readonly campaignRepository: CampaignRepository,

    @Inject(IMAGEN_UPDATE_PROVIDER)
    private readonly image: IUpdate<UpdateImagenDto, Imagen>,
  ) {}

  async update(
    id: string,
    input: UpdateCampaignDto,
    image: Express.Multer.File,
  ) {
    try {
      const response = await this.campaignRepository.update(id, input);
      const imageUrl = await this.cloudinaryUseCase.uploadImage(image);
      const imagem = await this.image.update(id, { url: imageUrl });

      return { ...response, imagem: imageUrl };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar campanha',
        error,
      );
    }
  }
}
