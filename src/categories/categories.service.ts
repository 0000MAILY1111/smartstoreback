import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Not, Repository } from 'typeorm';

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

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({id})
    if (!category) {
      throw new NotFoundException('la categoria no existe')
    }
    return category; //find a category by id in the database
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
