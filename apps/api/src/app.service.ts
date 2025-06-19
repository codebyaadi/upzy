import { Injectable } from '@nestjs/common';
import { auth } from '@upzy/auth/server';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
