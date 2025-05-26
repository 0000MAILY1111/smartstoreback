import { Injectable } from '@nestjs/common';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { Repository } from 'typeorm';
import { Cupon } from './entities/cupon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CuponsService {

  ///esto para la parte de la bd (conecta)
  ///aqui se maneja los endpoint de las api 
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

  async findOne(id: number) {
    const cupon = await this.cuponRepository.findOneBy({
      id: id,})
    if (!cupon) {
      throw new Error(`Cupon with id ${id} not found`);
    }
    return cupon;
  }

  async update(id: number, updateCuponDto: UpdateCuponDto) {
    const cupon = await this.findOne(id)
    Object.assign(cupon, updateCuponDto)
    return await this.cuponRepository.save(cupon);
  }

  async remove(id: number) {
    const cupon = await this.findOne(id);
    await this.cuponRepository.remove(cupon);
    return {message: "cupon eliminado correctamente"};
  }
}
