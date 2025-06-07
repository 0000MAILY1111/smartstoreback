import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)  private readonly categoryRepository : Repository<Category>
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto); //save the category to the database
    ///add setter and getter to the class
  }

  findAll() {
    return this.categoryRepository.find(); //find all categories in the database
  }

  async findOne(id: number, products?: string) {
    const options : FindManyOptions<Category> = {
      where: { id },
    };
    if (products === "true") {
      options.relations = {products:true}; //if products is true, return the products of the category
    }
    const category = await this.categoryRepository.findOne(options)
    if (!category) {
      throw new NotFoundException('la categoria no existe')
    }
    return category; 
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    return await this.categoryRepository.save(category); //update a category by id in the database
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepository.delete(category);
    return "Categoria Eliminada"//delete a category by id in the database
  }
}
