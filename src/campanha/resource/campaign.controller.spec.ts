import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from '../domain/repository/campaign.repository';
import { DeleteCampaignUseCase } from '../domain/use-cases/delete-campaign.use-cases';
import { CreateCampaignUseCase } from '../domain/use-cases/create-campaign.use-cases';
import { FindCampaignUseCase } from '../domain/use-cases/find-campaign.use-cases';
import { UpdateCampaignUseCase } from '../domain/use-cases/update-campaign.use-case';
import { MotoboyRepository } from '../../motoboy/domain/repository/motoboy.repository';
import { ConfigModule } from '@nestjs/config';
import { MotoboyRepositoryImpl } from '../../motoboy/data-access/infraestructure/repostitory/motoboy.repository.impl';
import { CampaignRepositoryImpl } from '../data-access/infraestructure/repository/campaign.repository.impl';
import { CampaignModule } from './campaign.module';
import { KnexModule } from 'nestjs-knex';
import { GenerateBearer } from '../../shared/utils/generate-bearer';
import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';
import { CloudinaryModule } from '../../cloudinary/resource/cloudinary.module';
import { ImagensModule } from '../../imagens/resource/imagens.module';
import {
  IMAGEN_CREATE_PROVIDER,
  IMAGEN_DELETE_PROVIDER,
  IMAGEN_FIND_BY_ID_PROVIDER,
  IMAGEN_UPDATE_PROVIDER,
} from '../../shared/constants/injection-tokens';
import { CreateImagenUseCase } from '../../imagens/domain/use-cases/create-imagem.use-case';
import { DeleteImagensUseCase } from '../../imagens/domain/use-cases/delete-imagem.use-case';
import { FindByIdImagemUseCase } from '../../imagens/domain/use-cases/find-by-id-imagem.use-case';
import { UpdateImagemUseCase } from '../../imagens/domain/use-cases/update-imagem.use-case';
import { CloudinaryProvider } from '../../cloudinary/data-access/infraestructure/storage/cloudinary.provider';
import { ICloudinaryProvider } from '../../cloudinary/domain/interfaces/icloudinary.provider';
import { ImagemRepositoryImpl } from '../../imagens/data-access/infraestructure/repository/imagem.repository.impl';
import { ImagemRepository } from '../../imagens/domain/repository/imagem.repository';
import { CloudinaryUseCase } from '../../cloudinary/domain/use-cases/cloudinary.use-case';

describe('CampaignController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: any;
  let generateBearer: GenerateBearer;

  const campaignData = {
    tipo: 'Campanha do Cassetinho',
    dias: ['Segunda-feira', 'Terça-feira'],
    horario_inicial: '2023-09-18T09:00:00.000Z',
    horario_final: '2023-09-18T17:00:00.000Z',
    limite_corridas_ignoradas: 3,
    limite_corridas_recusadas: 2,
    tempo_de_tolerancia: '2023-09-18T09:15:00.000Z',
    descricao: 'Descrição Teste',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CampaignModule,
        CloudinaryModule,
        ImagensModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        KnexModule.forRoot({
          config: {
            client: 'postgresql',
            useNullAsDefault: true,
            connection: {
              connectionString: process.env.CONNECTION_STRING,
              ssl: { rejectUnauthorized: false },
              host: process.env.HOST,
              port: 5432,
              user: process.env.USER,
              database: process.env.DATABASE,
              password: process.env.PASSWORD,
            },
          },
        }),
      ],
      controllers: [CampaignController],
      providers: [
        CreateCampaignUseCase,
        FindCampaignUseCase,
        UpdateCampaignUseCase,
        DeleteCampaignUseCase,
        CloudinaryUseCase,
        {
          provide: CampaignRepository,
          useClass: CampaignRepositoryImpl,
        },
        {
          provide: MotoboyRepository,
          useClass: MotoboyRepositoryImpl,
        },
        {
          provide: IMAGEN_CREATE_PROVIDER,
          useClass: CreateImagenUseCase,
        },
        {
          provide: IMAGEN_FIND_BY_ID_PROVIDER,
          useClass: FindByIdImagemUseCase,
        },
        {
          provide: IMAGEN_DELETE_PROVIDER,
          useClass: DeleteImagensUseCase,
        },
        {
          provide: IMAGEN_UPDATE_PROVIDER,
          useClass: UpdateImagemUseCase,
        },
        {
          provide: ICloudinaryProvider,
          useClass: CloudinaryProvider,
        },
        {
          provide: ImagemRepository,
          useClass: ImagemRepositoryImpl,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const motoboyRepo = moduleFixture.get<RegisterUseCase>(RegisterUseCase);
    const loginUseCase = moduleFixture.get<LoginUseCase>(LoginUseCase);
    generateBearer = new GenerateBearer(loginUseCase, motoboyRepo);
    jwtToken = await generateBearer.getJwtToken();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /campaign should create a campaign', async () => {
    const response = await request(app.getHttpServer())
      .post('/campaign')
      .field('tipo', campaignData.tipo)
      .field('dias', ['Segunda-feira', 'Terça-feira'])
      .field('horario_inicial', campaignData.horario_inicial)
      .field('horario_final', campaignData.horario_final)
      .field(
        'limite_corridas_ignoradas',
        campaignData.limite_corridas_ignoradas,
      )
      .field(
        'limite_corridas_recusadas',
        campaignData.limite_corridas_recusadas,
      )
      .field('tempo_de_tolerancia', campaignData.tempo_de_tolerancia)
      .field('descricao', campaignData.descricao)
      .attach('image', 'test/assets/moscando.jpg');

    expect(response.status).toBe(201);

    // expect(response.body).toMatchObject({ ...campaignData, status: true });
    // expect(typeof response.body.id).toBe('string');
  });

  it('GET /campaign should list all campaigns', async () => {
    const response = await request(app.getHttpServer())
      .get('/campaign')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const campaignFirst = response.body[0];
    expect(campaignFirst).toHaveProperty('tipo');
    expect(campaignFirst).toHaveProperty('dias');
    expect(campaignFirst).toHaveProperty('horario_inicial');
    expect(campaignFirst).toHaveProperty('horario_final');
    expect(campaignFirst).toHaveProperty('limite_corridas_ignoradas');
    expect(campaignFirst).toHaveProperty('limite_corridas_recusadas');
    expect(campaignFirst).toHaveProperty('tempo_de_tolerancia');
    expect(campaignFirst).toHaveProperty('descricao');
    // expect(campaignFirst).toHaveProperty('imagem');

    const campaignLast = response.body[response.body.length - 1];
    expect(campaignLast).toHaveProperty('tipo');
    expect(campaignLast).toHaveProperty('dias');
    expect(campaignLast).toHaveProperty('horario_inicial');
    expect(campaignLast).toHaveProperty('horario_final');
    expect(campaignLast).toHaveProperty('limite_corridas_ignoradas');
    expect(campaignLast).toHaveProperty('limite_corridas_recusadas');
    expect(campaignLast).toHaveProperty('tempo_de_tolerancia');
    expect(campaignLast).toHaveProperty('descricao');
    // expect(campaignLast).toHaveProperty('imagem');
  });

  it('GET /campaign/:id should get a campaign by its ID', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/campaign')
      .field('tipo', campaignData.tipo)
      .field('dias', campaignData.dias)
      .field('horario_inicial', campaignData.horario_inicial)
      .field('horario_final', campaignData.horario_final)
      .field(
        'limite_corridas_ignoradas',
        campaignData.limite_corridas_ignoradas,
      )
      .field(
        'limite_corridas_recusadas',
        campaignData.limite_corridas_recusadas,
      )
      .field('tempo_de_tolerancia', campaignData.tempo_de_tolerancia)
      .field('descricao', campaignData.descricao)
      .attach('image', 'test/assets/moscando.jpg');

    const createdCampaignId = postResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/campaign/${createdCampaignId}`)
      .set('Authorization', `Bearer ${jwtToken.access_token}`)
      .expect(200);

    expect(response.body.tipo).toEqual(campaignData.tipo);
    expect(response.body.dias).toEqual(campaignData.dias);
    expect(response.body.horario_inicial).toEqual(campaignData.horario_inicial);
    expect(response.body.horario_final).toEqual(campaignData.horario_final);
    expect(response.body.limite_corridas_ignoradas).toEqual(
      campaignData.limite_corridas_ignoradas,
    );
    expect(response.body.limite_corridas_recusadas).toEqual(
      campaignData.limite_corridas_recusadas,
    );
    expect(response.body.tempo_de_tolerancia).toEqual(
      campaignData.tempo_de_tolerancia,
    );
    expect(response.body.descricao).toEqual(campaignData.descricao);
  });

  it('PUT /campaign/:id should update a campaign', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/campaign')
      .field('tipo', campaignData.tipo)
      .field('dias', ['Segunda-feira', 'Terça-feira'])
      .field('horario_inicial', campaignData.horario_inicial)
      .field('horario_final', campaignData.horario_final)
      .field(
        'limite_corridas_ignoradas',
        campaignData.limite_corridas_ignoradas,
      )
      .field(
        'limite_corridas_recusadas',
        campaignData.limite_corridas_recusadas,
      )
      .field('tempo_de_tolerancia', campaignData.tempo_de_tolerancia)
      .field('descricao', campaignData.descricao)
      .attach('image', 'test/assets/moscando.jpg');

    const createdCampaignId = postResponse.body.id;

    const response = await request(app.getHttpServer())
      .put(`/campaign/${createdCampaignId}`)
      .field('tipo', 'Campnha foi Atualizada')
      .field('dias', campaignData.dias)
      .field('horario_inicial', campaignData.horario_inicial)
      .field('horario_final', campaignData.horario_final)
      .field(
        'limite_corridas_ignoradas',
        campaignData.limite_corridas_ignoradas,
      )
      .field(
        'limite_corridas_recusadas',
        campaignData.limite_corridas_recusadas,
      )
      .field('tempo_de_tolerancia', campaignData.tempo_de_tolerancia)
      .field('descricao', campaignData.descricao)
      .attach('image', 'test/assets/moscando.jpg');

    expect(response.status).toBe(200);
  });

  it('DELETE /campaign/:id should delete a campaign', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/campaign')
      .field('tipo', campaignData.tipo)
      .field('dias', ['Segunda-feira', 'Terça-feira'])
      .field('horario_inicial', campaignData.horario_inicial)
      .field('horario_final', campaignData.horario_final)
      .field(
        'limite_corridas_ignoradas',
        campaignData.limite_corridas_ignoradas,
      )
      .field(
        'limite_corridas_recusadas',
        campaignData.limite_corridas_recusadas,
      )
      .field('tempo_de_tolerancia', campaignData.tempo_de_tolerancia)
      .field('descricao', campaignData.descricao)
      .attach('image', 'test/assets/moscando.jpg');

    const createdCampaignId = postResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/campaign/${createdCampaignId}`)
      .expect(200);
  });
});
