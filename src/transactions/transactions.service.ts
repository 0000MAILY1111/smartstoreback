import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionContents } from './entities/transaction.entity';
import { Transaction } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import e from 'express';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(async (transactionEntityManager) => {

      const transaction = new Transaction();
      transaction.total = createTransactionDto.contents.reduce((total, item) => total + (item.quantity * item.price), 0)

      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId });
        const errorss = [] as string[];

        if (!product) {
          errorss.push(`El producto con el ID: ${contents.productId} no existe`);
          throw new NotFoundException(errorss)
        }
        if (contents.quantity > product.inventory) {
          errorss.push(`El producto ${product.name} excede la cantidad de inventario`);
          throw new BadRequestException(errorss)
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
    })
    return "Venta almacenada correctamente";
  }

  ///contents , es donde se relaciona los datos es como hacer el Join en SQL
  ///es como tenemos relacionado los datos Manejamos TYPEORM para base de datos Robustas
  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true,
      },
    }
    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Fecha no valida');
      }
      const start = startOfDay(date);
      const end = endOfDay(date);
      console.log(start, end);

      options.where = {
        transactionDate: Between(start, end)
      };
    }
    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        contents: true,
      },
    });
    if (!transaction) {
      throw new NotFoundException("Transaccion no encontrada");
    }
    return transaction;
  }
  /*
    update(id: number, updateTransactionDto: UpdateTransactionDto) {
      return `This action updates a #${id} transaction`;
    }
  */
  async remove(id: number) {
    const transaction = await this.findOne(id)
    for (const content of transaction.contents) {
      const transactionContent = await this.transactionContentsRepository.findOne({
        where: { id: content.id },
        relations: ['product']
      });
    }
    await this.transactionRepository.remove(transaction);
    return { message: "Venta eliminada correctamente" };
  }
}
