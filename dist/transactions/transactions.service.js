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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const transaction_entity_2 = require("./entities/transaction.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
const date_fns_1 = require("date-fns");
const cupons_service_1 = require("../cupons/cupons.service");
let TransactionsService = class TransactionsService {
    transactionRepository;
    transactionContentsRepository;
    productRepository;
    cuponsService;
    constructor(transactionRepository, transactionContentsRepository, productRepository, cuponsService) {
        this.transactionRepository = transactionRepository;
        this.transactionContentsRepository = transactionContentsRepository;
        this.productRepository = productRepository;
        this.cuponsService = cuponsService;
    }
    async create(createTransactionDto) {
        await this.productRepository.manager.transaction(async (transactionEntityManager) => {
            const transaction = new transaction_entity_2.Transaction();
            const total = createTransactionDto.contents.reduce((total, item) => total + (item.quantity * item.price), 0);
            transaction.total = total;
            if (createTransactionDto.cupon) {
                const cupon = await this.cuponsService.applyCupon(createTransactionDto.cupon);
                const discount = (cupon.percentage / 100) * total;
                transaction.discount = discount;
                transaction.cupon = cupon.name;
                transaction.total -= discount;
            }
            for (const contents of createTransactionDto.contents) {
                const product = await transactionEntityManager.findOneBy(product_entity_1.Product, { id: contents.productId });
                const errorss = [];
                if (!product) {
                    errorss.push(`El producto con el ID: ${contents.productId} no existe`);
                    throw new common_1.NotFoundException(errorss);
                }
                if (contents.quantity > product.inventory) {
                    errorss.push(`El producto ${product.name} excede la cantidad de inventario`);
                    throw new common_1.BadRequestException(errorss);
                }
                product.inventory -= contents.quantity;
                const transactionContent = new transaction_entity_1.TransactionContents();
                transactionContent.quantity = contents.quantity;
                transactionContent.transaction = transaction;
                transactionContent.product = product;
                transactionContent.price = contents.price;
                await transactionEntityManager.save(transaction);
                await transactionEntityManager.save(product);
                await transactionEntityManager.save(transactionContent);
            }
        });
        return "Venta almacenada correctamente";
    }
    findAll(transactionDate) {
        const options = {
            relations: {
                contents: true,
            },
        };
        if (transactionDate) {
            const date = (0, date_fns_1.parseISO)(transactionDate);
            if (!(0, date_fns_1.isValid)(date)) {
                throw new common_1.BadRequestException('Fecha no valida');
            }
            const start = (0, date_fns_1.startOfDay)(date);
            const end = (0, date_fns_1.endOfDay)(date);
            console.log(start, end);
            options.where = {
                transactionDate: (0, typeorm_2.Between)(start, end)
            };
        }
        return this.transactionRepository.find(options);
    }
    async findOne(id) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: {
                contents: true,
            },
        });
        if (!transaction) {
            throw new common_1.NotFoundException("Transaccion no encontrada");
        }
        return transaction;
    }
    async remove(id) {
        return this.transactionRepository.manager.transaction(async (manager) => {
            const transaction = await this.findOne(id);
            for (const content of transaction.contents) {
                const product = await this.productRepository.findOneBy({ id: content.product.id });
                if (!product) {
                    throw new common_1.NotFoundException(`Producto con ID ${content.product.id} no encontrado`);
                }
                product.inventory += content.quantity;
                await manager.save(product);
            }
            await manager.remove(transaction);
            return { message: "Venta eliminada correctamente" };
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_2.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionContents)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cupons_service_1.CuponsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map