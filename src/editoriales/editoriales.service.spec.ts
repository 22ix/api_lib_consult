import { Test, TestingModule } from '@nestjs/testing';
import { EditorialesService } from './editoriales.service';

describe('EditorialesService', () => {
  let service: EditorialesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditorialesService],
    }).compile();

    service = module.get<EditorialesService>(EditorialesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
