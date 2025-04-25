import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './model/users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly usersRepository: typeof Users,
    private readonly fileService: FileService,
  ) {}

  getAll() {
    return this.usersRepository.findAll({ include: { all: true } });
  }

  async create(createUserDto: CreateUserDto, avatar: any) {
    const fileName = await this.fileService.saveImage(avatar);
    return this.usersRepository.create({
      ...createUserDto,
      age: +createUserDto.age,
      raiting: +createUserDto.raiting,
      avatar: fileName,
    });
  }

  async getOne(id: number) {
    const user = await this.usersRepository.findByPk(id);
    return user || {};
  }

  getByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Game was not found');
    }

    const updatedData = await this.usersRepository.update(
      {
        ...updateUserDto,
        age: updateUserDto.age ? +updateUserDto.age : user.age,
        raiting: updateUserDto.raiting ? +updateUserDto.raiting : user.age,
      },
      {
        where: { id },
        returning: true,
      },
    );
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
