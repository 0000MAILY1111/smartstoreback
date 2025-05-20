import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    ///relacion de tablas muchos a uno   en l findall service optimizado, no es necesario hacer JOIN , solo con el cascade
    @ManyToOne ( ()=> Category )
    category : Category

}
