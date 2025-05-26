import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log (createProductDto)
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query : GetProductsQueryDto) {
    const category = query.category_id  
    const take = query.take ? query.take : 10
    const skip = query.skip ? query.skip : 0
    console.log(category);
    console.log(take);
    console.log(query);
    return this.productsService.findAll(category, take, skip);
  }

  @Get(':id')  ///para verificar que el id es un numero y que el producto exista
  findOne(@Param('id', IdValidationPipe) id: string) {
    const product = this.productsService.findOne(+id);
    if (!product) {
      throw new Error(`El producto con el ID: ${id} no fue encontrado`);
    }
    return this.productsService.findOne(+id);
  }

  @Put(':id')   ///de patch a put
  update(@Param('id', IdValidationPipe) id: string,
   @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }
}
