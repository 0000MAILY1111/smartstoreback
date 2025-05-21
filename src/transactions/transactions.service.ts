import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionContents } from './entities/transaction.entity';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor (
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Transaction) private readonly transactionContentsRepository: Repository<Transaction>

  ){}

  create(createTransactionDto: CreateTransactionDto) {
    const trasnaction = new Transaction();
    
    return this.transactionRepository.save(createTransactionDto);
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
