"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const cupon_entity_1 = require("./entities/cupon.entity");
const typeorm_2 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
let CuponsService = class CuponsService {
    cuponRepository;
    constructor(cuponRepository) {
        this.cuponRepository = cuponRepository;
    }
    create(createCuponDto) {
        return this.cuponRepository.save(createCuponDto);
    }
    findAll() {
        return this.cuponRepository.find({});
    }
    async findOne(id) {
        const cupon = await this.cuponRepository.findOneBy({
            id: id,
        });
        if (!cupon) {
            throw new Error(`Cupon with id ${id} not found`);
        }
        return cupon;
    }
    async update(id, updateCuponDto) {
        const cupon = await this.findOne(id);
        Object.assign(cupon, updateCuponDto);
        return await this.cuponRepository.save(cupon);
    }
    async remove(id) {
        const cupon = await this.findOne(id);
        await this.cuponRepository.remove(cupon);
        return { message: "cupon eliminado correctamente" };
    }
    async applyCupon(cuponName) {
        const cupon = await this.cuponRepository.findOneBy({ name: cuponName });
        if (!cupon) {
            throw new common_1.NotFoundException('El cupon no existe');
        }
        const currentDate = new Date();
        const expirationDate = (0, date_fns_1.endOfDay)(cupon.expirationDate);
        if ((0, date_fns_1.isAfter)(currentDate, expirationDate)) {
            throw new common_1.UnprocessableEntityException('El cupon ha expirado');
        }
        return {
            message: 'Cupon valido',
            ...cupon,
        };
    }
};
exports.CuponsService = CuponsService;
exports.CuponsService = CuponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(cupon_entity_1.Cupon)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CuponsService);
//# sourceMappingURL=cupons.service.js.map