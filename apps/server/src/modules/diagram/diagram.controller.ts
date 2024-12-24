import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
} from '@nestjs/common'
import { DiagramService } from './diagram.service'
import { CreateDiagramDto } from './dto/create-diagram.dto'
import { UpdateDiagramDto } from './dto/update-diagram.dto'
import { CommonArgs } from '@server/types/common-fields'
import { DiagramId } from '@shared/types/diagram'

@Controller('diagram')
export class DiagramController {
   constructor(private readonly diagramService: DiagramService) {}

   @Post('create')
   create(@Body() createDiagramDto: CreateDiagramDto, args: CommonArgs) {
      return this.diagramService.create(createDiagramDto, args)
   }

   @Get('getAll')
   findAll(@Body() args: CommonArgs) {
      return this.diagramService.findAll(args)
   }

   @Get(':id')
   findOne(@Param('id') id: DiagramId, args: CommonArgs) {
      return this.diagramService.findOne(id, args)
   }

   @Patch('update/:id') // Update diagram
   update(
      @Param('id') id: DiagramId,
      @Body() updateDiagramDto: UpdateDiagramDto,
      args: CommonArgs,
   ) {
      return this.diagramService.update(id, updateDiagramDto, args)
   }

   @Delete(':id')
   remove(@Param('id') id: DiagramId, args: CommonArgs) {
      return this.diagramService.remove(id, args)
   }
}
