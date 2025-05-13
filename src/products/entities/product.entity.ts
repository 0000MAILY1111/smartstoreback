import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 100, nullable: true, default: 'default.svg'})
    image: string;

    @Column({type: 'decimal'})
    price: number;

    @Column({type: 'int'})
    inventory: number;

    @ManyToMany ( ()=> Category )
    category : Category

}
