import { Module } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CuponsController } from './cupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cupon } from './entities/cupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cupon])],
  controllers: [CuponsController],
  providers: [CuponsService],
  exports: [CuponsService]  // Exportamos el servicio para que pueda ser utilizado en otros modulos
  
})
export class CuponsModule {}
