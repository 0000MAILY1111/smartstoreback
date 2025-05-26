import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';
import { CuponsModule } from 'src/cupons/cupons.module';

@Module({
  imports : [TypeOrmModule.forFeature([Transaction, TransactionContents, Product]),
  CuponsModule  // Importamos el modulo de cupones para poder usar su servicio
],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
