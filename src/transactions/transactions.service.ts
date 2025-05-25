import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionContents } from './entities/transaction.entity';
import { Transaction } from './entities/transaction.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(async (transactionEntityManager) => {

      const transaction = new Transaction();
      transaction.total = createTransactionDto.contents.reduce ( (total, item)=> total + (item.quantity * item.price), 0 )

      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy( Product,{ id: contents.productId });
        const errorss = [] as string[];
        
        if (!product) {
          errorss.push(`El producto con el ID: ${contents.productId} no existe`);
          throw new NotFoundException (errorss)
        }
        if (contents.quantity > product.inventory) {
          errorss.push(`El producto ${product.name} excede la cantidad de inventario`);
          throw new BadRequestException (errorss)
        }
        product.inventory -= contents.quantity;
       // await transactionEntityManager.save(product);
        const transactionContent = new TransactionContents();
        transactionContent.quantity = contents.quantity;
        transactionContent.transaction = transaction;
        transactionContent.product = product;
        transactionContent.price = contents.price;

        await transactionEntityManager.save(transaction);
        await transactionEntityManager.save(product);
        await transactionEntityManager.save(transactionContent);
      }
      return "Venta almacenada correctamente";
    })
  }

  findAll() {
    const options : FindManyOptions<Transaction> = {
      relations: {
        contents: true,
      },
    }
    
    return this.transactionContentsRepository.find();

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
