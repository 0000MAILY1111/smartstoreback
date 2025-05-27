import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { CuponsModule } from '../cupons/cupons.module';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory : typeOrmConfig ,
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Product, Category]),  
        ///seeder module deleted from the imports array as it is not used in the current context
        
        CategoriesModule,
        ProductsModule,
        TransactionsModule,
        CuponsModule,   ///seeder module deleted from the imports array as it is not used in the current context
        ],
    providers: [SeederService],
})
export class SeederModule {}
