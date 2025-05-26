import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { ApplyCuponDto } from './dto/apply-cupon.dto';

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}

  @Post()
  create(@Body() createCuponDto: CreateCuponDto) {
    return this.cuponsService.create(createCuponDto);
  }

  @Get()
  findAll() {
    return this.cuponsService.findAll();
  }

  @Get(':id', ) ///para verificar que el id es un numero y que el cupon exista
  async findOne(@Param('id', IdValidationPipe) id: string) {
    const cupon = await this.cuponsService.findOne(+id);
    if (!cupon) {
      throw new Error(`El cupon con el ID: ${id} no fue encontrado`);
    }
    return this.cuponsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', IdValidationPipe) id: string,  ///para leer la URL y validar el id
   @Body() updateCuponDto: UpdateCuponDto) {    ///DTO de la actualizacion del cupon
    return this.cuponsService.update(+id, updateCuponDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.cuponsService.remove(+id);
  }

  ///endpoint para canjear el cupon
  ///no olvide crear el DTO de la aplicacion del cupon cupons service
  @Post("/apply-cupons")
  @HttpCode(HttpStatus.OK)  
  applyCupon(@Body() applyCuponDto: ApplyCuponDto) {
    return this.cuponsService.applyCupon(applyCuponDto.cuponname);
  }
}
