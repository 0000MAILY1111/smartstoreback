import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cupon {
    @PrimaryColumn()
    id: number;
    @Column ({ type: 'timestamp', length: 6 })
    name: string;
    percentage: number;
    expirationDate: Date;

    ///class cupon 
    

}
