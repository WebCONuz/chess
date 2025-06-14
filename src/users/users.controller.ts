import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthGuard } from '../common/guards/user-auth.guard';
import { UserSelfGuard } from '../common/guards/self.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UserAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar: any) {
    return this.usersService.create(createUserDto, avatar);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
