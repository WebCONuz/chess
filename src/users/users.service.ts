import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './model/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly usersRepository: typeof Users,
  ) {}

  getAll() {
    return this.usersRepository.findAll();
  }

  async getOne(id: number) {
    const user = await this.usersRepository.findByPk(id);
    return user || {};
  }
}
