import { IsString, IsNotEmpty } from 'class-validator';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = () : TypeOrmModuleOptions => ({
    type: 'postgres',

})
