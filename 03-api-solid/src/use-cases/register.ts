import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: IRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
