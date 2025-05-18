import { IsNumberString, IsOptional, Validator } from "class-validator";

export class GetProductsQueryDto {
    @IsOptional()
    @IsNumberString({}, {message: 'El id de la categoría debe ser un número'})
    category_id: number; 

    @IsOptional()
    @IsNumberString({}, {message: ' la cantidad debe ser un número'})
     take: number; 

    @IsOptional()
    @IsNumberString({}, {message: ' la cantidad debe ser un número'})
     skip: number; 

}   ///mas adelante se puede agregar el id del producto para filtrar por id