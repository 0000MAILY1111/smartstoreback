import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CuponsModule } from './cupons/cupons.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory : typeOrmConfig ,
      inject: [ConfigService],
      
    }),
    
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
    CuponsModule,   ///seeder module deleted from the imports array as it is not used in the current context
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
