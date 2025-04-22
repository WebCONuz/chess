import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './model/game.model';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game)
    private readonly gameRepo: typeof Game,
  ) {}

  async create(
    createGameDto: CreateGameDto & { user1: number; user2: number },
  ) {
    const { user1, user2 } = createGameDto;
    const game = await this.gameRepo.create(createGameDto);

    game.$set('players', [user1]);
    game.$set('players', [user2]);

    return game;
  }

  findAll() {
    return this.gameRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.gameRepo.findByPk(id);
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.gameRepo.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException('Game was not found');
    }

    const updatedData = await this.gameRepo.update(updateGameDto, {
      where: { id },
      returning: true,
    });
    return updatedData;
  }

  async remove(id: number) {
    const game = await this.gameRepo.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException('Game was not found');
    }

    await this.gameRepo.destroy({ where: { id } });
    return id;
  }
}
