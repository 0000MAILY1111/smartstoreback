"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const seeder_service_1 = require("./seeder.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("../config/typeorm.config");
const categories_module_1 = require("../categories/categories.module");
const products_module_1 = require("../products/products.module");
const transactions_module_1 = require("../transactions/transactions.module");
const cupons_module_1 = require("../cupons/cupons.module");
const product_entity_1 = require("../products/entities/product.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: typeorm_config_1.typeOrmConfig,
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, category_entity_1.Category]),
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            transactions_module_1.TransactionsModule,
            cupons_module_1.CuponsModule,
        ],
        providers: [seeder_service_1.SeederService],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map