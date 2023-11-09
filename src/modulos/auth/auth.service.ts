import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, senha: string) {
    return 'This action adds a new auth';
  }
}
