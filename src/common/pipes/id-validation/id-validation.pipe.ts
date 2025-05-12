import { ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe extends ParseIntPipe {

  ///para reinscribir ParseIntPipe constructores
  constructor() {
    super({
        exceptionFactory: () => {
          return new BadRequestException('Id no valido');
        }
    });
  }

}
