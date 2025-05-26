import { IsNotEmpty } from "class-validator";

export class ApplyCuponDto {
 @IsNotEmpty({message: "El nombre del cupon es obligatorio"})
 cuponname: string;
 
}