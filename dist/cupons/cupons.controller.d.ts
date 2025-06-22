import { CuponsService } from './cupons.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { ApplyCuponDto } from './dto/apply-cupon.dto';
export declare class CuponsController {
    private readonly cuponsService;
    constructor(cuponsService: CuponsService);
    create(createCuponDto: CreateCuponDto): Promise<CreateCuponDto & import("./entities/cupon.entity").Cupon>;
    findAll(): Promise<import("./entities/cupon.entity").Cupon[]>;
    findOne(id: string): Promise<import("./entities/cupon.entity").Cupon>;
    update(id: string, updateCuponDto: UpdateCuponDto): Promise<import("./entities/cupon.entity").Cupon>;
    remove(id: string): Promise<{
        message: string;
    }>;
    applyCupon(applyCuponDto: ApplyCuponDto): Promise<{
        id: number;
        name: string;
        percentage: number;
        expirationDate: Date;
        message: string;
    }>;
}
