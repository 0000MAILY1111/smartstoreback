import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nueva Vista!';
  }
  postHello() {
    return 'Desde @Post en el service!';
  }
}
