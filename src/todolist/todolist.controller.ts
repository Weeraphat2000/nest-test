import { Controller, Get, Post } from '@nestjs/common';

@Controller('todolist')
export class TodolistController {
  @Get('/testtodolist')
  getSomething(): string[] {
    return ['get something'];
  }

  @Post('/testpost')
  testPost(): string {
    return 'testpost';
  }
}
