import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { Repository } from 'typeorm';
import { Cupon } from './entities/cupon.entity';
export declare class CuponsService {
    private readonly cuponRepository;
    constructor(cuponRepository: Repository<Cupon>);
    create(createCuponDto: CreateCuponDto): Promise<CreateCuponDto & Cupon>;
    findAll(): Promise<Cupon[]>;
    findOne(id: number): Promise<Cupon>;
    update(id: number, updateCuponDto: UpdateCuponDto): Promise<Cupon>;
    remove(id: number): Promise<{
        message: string;
    }>;
    applyCupon(cuponName: string): Promise<{
        id: number;
        name: string;
        percentage: number;
        expirationDate: Date;
        message: string;
    }>;
}
