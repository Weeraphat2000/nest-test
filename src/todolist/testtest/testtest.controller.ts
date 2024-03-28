import { Controller, Get, Post } from '@nestjs/common';

@Controller('testtest')
export class TesttestController {
  @Post('/a')
  test(): string {
    return 'et';
  }
}
