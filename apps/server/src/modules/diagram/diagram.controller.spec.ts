import { Test, TestingModule } from '@nestjs/testing'
import { DiagramController } from './diagram.controller'
import { DiagramService } from './diagram.service'

describe('DiagramController', () => {
   let controller: DiagramController

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [DiagramController],
         providers: [DiagramService],
      }).compile()

      controller = module.get<DiagramController>(DiagramController)
   })

   it('should be defined', () => {
      expect(controller).toBeDefined()
   })
})
