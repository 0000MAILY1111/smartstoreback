"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const typeOrmConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    ssl: true,
    logging: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map