import { Injectable } from '@nestjs/common';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { Repository } from 'typeorm';
import { Cupon } from './entities/cupon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CuponsService {

  ///esto para la parte de la bd (conecta)
  constructor(
    @InjectRepository (Cupon) private readonly cuponRepository: Repository<Cupon>,
  ) {}
  create(createCuponDto: CreateCuponDto) {
    return this.cuponRepository.save(createCuponDto);
  }

  findAll() {
    return this.cuponRepository.find({
      
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cupon`;
  }

  update(id: number, updateCuponDto: UpdateCuponDto) {
    return `This action updates a #${id} cupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} cupon`;
  }
}
