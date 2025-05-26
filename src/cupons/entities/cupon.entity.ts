import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cupon {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    name: string;

    @Column({ type: 'int' })
    percentage: number;

    @Column({ type: 'date' })
    expirationDate: Date;

    // Clase cupon: los cupones serán usados según el dueño y su modelo de negocio
}