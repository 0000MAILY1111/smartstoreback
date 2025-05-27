import { Product } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('decimal')
    total: number;
    @Column({type:'varchar', length: 30, nullable: true})
    cupon: string;
    @Column({type:'decimal', nullable: true , default:0})  ///esto es para que si no se aplica un cupon no de error
    discount: number;

    @Column({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP(6)'})
    transactionDate: Date;
    @OneToMany ( () => TransactionContents, (transaction) => transaction.transaction , {cascade: true})  ///solo aqui manejaremos las casacadas uwu
    contents : TransactionContents[]
}

@Entity()
export class TransactionContents{
    @PrimaryGeneratedColumn()
    id: number;
    @Column('int')
    quantity: number;
    @Column('decimal')
    price: number;
    @ManyToOne(() => Product, (product) => product.id , {eager: true})
    product: Product;
    //ralcion de entidades 
    @ManyToOne(() => Transaction, (transaction) => transaction.contents)
    transaction: Transaction;
    
}

