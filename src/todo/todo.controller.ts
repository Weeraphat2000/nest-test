import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  // เอา service มาใช้งาน
  // ต้องประกาศ constructor
  // เอาตัวแปล todoService1 มากับ service TodoService เพื่อใช้งาน TodoService
  constructor(private todoService1: TodoService) {}

  @Get('/todosomething')
  getTodos(): number[] {
    return [1, 2, 3];
  }

  @Post()
  postSomthing(): string {
    return '55555';
  }

  @Post('/bodytodo/:QQ')
  postTodo(
    //   อ่านdoby title เอาไปเก็บไว้ในตัวแปล titile
    @Body('title') titile: string,
    @Body('subtitle') subtitle: string,
    // prase params เข้ามาที่ QQ แล้วเอาไปเก็บไว้ที่ตัวแปล q
    @Param('QQ') q: string,
    // prase query เข้ามาที่ h แล้วเอาไปเก็ยไว้ที่ตัวแปล h
    @Query('h') h: string,
  ) {
    console.log(titile, 'titile');
    console.log(subtitle, 'subtitle');
    console.log(q, 'QQ');

    console.log(h, 'h');
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string): string {
    console.log(id, 'id');
    return `${id} นะๆ`;
  }

  @Post('service')
  postService(
    @Body('title') title: string,
    @Body('subtitle') subtitle: string,
  ) {
    const number = this.todoService1.addTodo(title, subtitle);
    console.log(number, 'NUMBER');
  }

  @Get('postTodos')
  getTodoss() {
    return this.todoService1.getTodos();
  }

  @Delete('/todo/:id')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService1.removeTodaById(id);
  }
}
