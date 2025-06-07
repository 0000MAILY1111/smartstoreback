import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { products } from 'src/seeder/data/products';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto.name);
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')  ///para verificar que el id es un numero y que la categoría exista
  findOne(@Param('id', IdValidationPipe) id: string, 
          @Query ('products')  products? : string 
) {   
    const category = this.categoriesService.findOne(+id);
    if (!category) {
      throw new BadRequestException(`La categoría con el ID: ${id} no fue encontrada`);
    }
    return this.categoriesService.findOne(+id, products);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
     @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
