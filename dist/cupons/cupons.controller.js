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
exports.CuponsController = void 0;
const common_1 = require("@nestjs/common");
const cupons_service_1 = require("./cupons.service");
const create_cupon_dto_1 = require("./dto/create-cupon.dto");
const update_cupon_dto_1 = require("./dto/update-cupon.dto");
const id_validation_pipe_1 = require("../common/pipes/id-validation/id-validation.pipe");
const apply_cupon_dto_1 = require("./dto/apply-cupon.dto");
let CuponsController = class CuponsController {
    cuponsService;
    constructor(cuponsService) {
        this.cuponsService = cuponsService;
    }
    create(createCuponDto) {
        return this.cuponsService.create(createCuponDto);
    }
    findAll() {
        return this.cuponsService.findAll();
    }
    async findOne(id) {
        const cupon = await this.cuponsService.findOne(+id);
        if (!cupon) {
            throw new Error(`El cupon con el ID: ${id} no fue encontrado`);
        }
        return this.cuponsService.findOne(+id);
    }
    update(id, updateCuponDto) {
        return this.cuponsService.update(+id, updateCuponDto);
    }
    remove(id) {
        return this.cuponsService.remove(+id);
    }
    applyCupon(applyCuponDto) {
        return this.cuponsService.applyCupon(applyCuponDto.cuponname);
    }
};
exports.CuponsController = CuponsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cupon_dto_1.CreateCuponDto]),
    __metadata("design:returntype", void 0)
], CuponsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CuponsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CuponsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cupon_dto_1.UpdateCuponDto]),
    __metadata("design:returntype", void 0)
], CuponsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CuponsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("/apply-cupons"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_cupon_dto_1.ApplyCuponDto]),
    __metadata("design:returntype", void 0)
], CuponsController.prototype, "applyCupon", null);
exports.CuponsController = CuponsController = __decorate([
    (0, common_1.Controller)('cupons'),
    __metadata("design:paramtypes", [cupons_service_1.CuponsService])
], CuponsController);
//# sourceMappingURL=cupons.controller.js.map