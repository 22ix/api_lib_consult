import { Module } from '@nestjs/common';
import { EditorialesController } from './editoriales.controller';
import { EditorialesService } from './editoriales.service';

@Module({
  controllers: [EditorialesController],
  providers: [EditorialesService]
})
export class EditorialesModule {}
