import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/categories/entities/category.entity"

export class CreateProductDto {
    @IsNotEmpty({message: 'Name of product is required'})
    @IsString({message: 'value not valid'})
    name : string

     @IsNotEmpty({message: 'Price of Product is required'})
     @IsNumber({maxDecimalPlaces : 2}, {message: 'Price not valid'})
    price : number

    @IsNotEmpty({message: 'Cant of Product is required'})
    @IsNumber({maxDecimalPlaces : 0}, {message: 'Cant not valid'})
    inventory : number

     @IsNotEmpty({message: 'Category of Product is required'})
     @IsInt ({message: 'Category not valid'})
    categoryId : number

}
