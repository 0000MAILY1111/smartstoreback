import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionContents } from './entities/transaction.entity';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CuponsService } from '../cupons/cupons.service';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly transactionContentsRepository;
    private readonly productRepository;
    private readonly cuponsService;
    constructor(transactionRepository: Repository<Transaction>, transactionContentsRepository: Repository<TransactionContents>, productRepository: Repository<Product>, cuponsService: CuponsService);
    create(createTransactionDto: CreateTransactionDto): Promise<string>;
    findAll(transactionDate?: string): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
