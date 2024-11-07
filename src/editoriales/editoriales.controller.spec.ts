import { Test, TestingModule } from '@nestjs/testing';
import { EditorialesController } from './editoriales.controller';

describe('EditorialesController', () => {
  let controller: EditorialesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditorialesController],
    }).compile();

    controller = module.get<EditorialesController>(EditorialesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
