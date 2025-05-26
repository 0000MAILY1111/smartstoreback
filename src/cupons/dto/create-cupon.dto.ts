import { IsDateString, IsInt, IsNotEmpty, Max } from "class-validator";

export class CreateCuponDto {
    @IsNotEmpty({ message: 'El nombre del cupón no puede estar vacío' })
    name: string;
    @IsNotEmpty({ message: 'El descuento no puede ir vacio' })
    @IsInt({ message: 'El descuento debe ser entre 1 y 100' })
    @Max(100, { message: 'El descuento maximo es de 100' })
    percentage: number;   //esto ddebe ir entre el 1 y el 0 
    @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía' })
    @IsDateString({}, { message: 'Fecha no valida' })
    expirationDate: Date;
    ///sql dat

}
