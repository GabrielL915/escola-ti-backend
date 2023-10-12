import { Test, TestingModule } from '@nestjs/testing';
import { ImagensController } from './imagens.controller';
import { ImagensService } from './imagens.service';

describe('ImagensController', () => {
  let controller: ImagensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagensController],
      providers: [ImagensService],
    }).compile();

    controller = module.get<ImagensController>(ImagensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
