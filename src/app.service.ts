import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola mundo!';
  }

  nicknameGenerator(name: string): string {
    return name.substring(0, 3) + '123';
  }
}
