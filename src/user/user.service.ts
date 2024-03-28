import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { createUser, updateUser } from './user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async creaUser(data: createUser) {
    try {
      return await this.prismaService.user.create({ data });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('invalid user');
    }
  }

  async updateUser(data: updateUser, id: number) {
    try {
      return await this.prismaService.user.update({
        data: data,
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('invalid user');
    }
  }

  async getAllUser() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: number) {
    try {
      await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('id user invalid');
    }
  }
}
