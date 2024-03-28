import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUser, updateUser } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('')
  async creatUser(@Body() body: createUser) {
    const result = await this.userService.creaUser(body);
    return result;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: updateUser) {
    const result = await this.userService.updateUser(body, +id);
    return result;
  }

  @Get()
  async getUser() {
    return this.userService.getAllUser();
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(+id);
    return 'deleted';
  }
}
