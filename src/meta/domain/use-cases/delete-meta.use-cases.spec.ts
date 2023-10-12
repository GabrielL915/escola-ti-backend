import { Test, TestingModule } from "@nestjs/testing";
import { DeleteMetaUseCase } from "./delete-meta.use-cases";
import { MetaRepository } from "../repository/meta.repository";
import { InternalServerErrorException } from "@nestjs/common";

describe("DeleteMetaUseCase", () => {
  let deleteMetaUseCase: DeleteMetaUseCase;
  let mockMetaRepository: Partial<jest.Mocked<MetaRepository>>;

  beforeEach(async () => {
    mockMetaRepository = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMetaUseCase,
        {
          provide: MetaRepository,
          useValue: mockMetaRepository,
        },
      ],
    }).compile();

    deleteMetaUseCase = module.get<DeleteMetaUseCase>(DeleteMetaUseCase);
  });

  it("should be defined", () => {
    expect(deleteMetaUseCase).toBeDefined();
  });

  it("should throw InternalServerErrorException when metaRepository.delete fails", async () => {
    const mockMetaId = "mockId";

    mockMetaRepository.delete.mockRejectedValueOnce(
      new Error("Erro ao deletar meta")
    );

    await expect(deleteMetaUseCase.delete(mockMetaId)).rejects.toThrow(
      InternalServerErrorException
    );
  });
});