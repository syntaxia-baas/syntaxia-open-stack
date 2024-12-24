import { Module } from '@nestjs/common';
import { DiagramService } from './diagram.service';
import { DiagramController } from './diagram.controller';

@Module({
  controllers: [DiagramController],
  providers: [DiagramService],
})
export class DiagramModule {}
