import { IsString, IsNotEmpty } from 'class-validator';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService : ConfigService) : TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    ssl : true ,
    logging: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
})
