import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
} from '@nestjs/common'
import { DiagramService } from './diagram.service'
import { UserArgs } from '@server/types/common-fields'
import {
   CreateDiagramCommand,
   DiagramId,
   UpdateDiagramCommand,
} from '@shared/types/diagram'
import { GetUserArgs } from '@server/core/rest/decorators/user-args-decorator'
import { AuthorizeGuard } from '@server/core/rest/guards/authorize.guard'

@Controller('diagram')
@UseGuards(AuthorizeGuard)
export class DiagramController {
   constructor(private readonly diagramService: DiagramService) {}

   @Post('create')
   create(@Body() cmd: CreateDiagramCommand, @GetUserArgs() args: UserArgs) {
      return this.diagramService.create(cmd, args)
   }

   @Get('getAll')
   findAll(@GetUserArgs() args: UserArgs) {
      return this.diagramService
         .findAll(args)
         .then(res => {
            return res
         })
         .catch(err => {
            console.log(err)
         })
   }

   @Get(':id')
   findOne(@Param('id') id: DiagramId, @GetUserArgs() args: UserArgs) {
      return this.diagramService.findOne(id, args)
   }

   @Patch('update/:id') // Update diagram
   update(
      @Param('id') id: DiagramId,
      @Body() cmd: UpdateDiagramCommand,
      @GetUserArgs() args: UserArgs,
   ) {
      return this.diagramService.update(id, cmd, args)
   }

   @Delete(':id')
   remove(@Param('id') id: DiagramId, @GetUserArgs() args: UserArgs) {
      return this.diagramService.remove(id, args)
   }
}
