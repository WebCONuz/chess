import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './model/users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly usersRepository: typeof Users,
  ) {}

  getAll() {
    return this.usersRepository.findAll({ include: { all: true } });
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async getOne(id: number) {
    const user = await this.usersRepository.findByPk(id);
    return user || {};
  }

  getByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const game = await this.usersRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException('Game was not found');
    }

    const updatedData = await this.usersRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedData;
  }

  async remove(id: number) {
    const game = await this.usersRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException('Game was not found');
    }

    await this.usersRepository.destroy({ where: { id } });
    return id;
  }
}
