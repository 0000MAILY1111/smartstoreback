import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cupon {
    @PrimaryColumn()
    id: number;
    @Column ({ type: 'varchar', length: 30 })
    name: string;
    @Column ({ type: 'int' })  
    percentage: number;
    @Column ({ type: 'date' })
    expirationDate: Date;

    ///class cupon los cupones seran usados segun el dueño y su modelo de negocio

    ///nueva clase d eonbjt

}
