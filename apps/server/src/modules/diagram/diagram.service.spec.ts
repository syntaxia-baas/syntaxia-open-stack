import { Test, TestingModule } from '@nestjs/testing';
import { DiagramService } from './diagram.service';

describe('DiagramService', () => {
  let service: DiagramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagramService],
    }).compile();

    service = module.get<DiagramService>(DiagramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
