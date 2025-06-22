import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<string>;
    findAll(transactionDate: string): Promise<import("./entities/transaction.entity").Transaction[]>;
    findOne(id: string): Promise<import("./entities/transaction.entity").Transaction>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
