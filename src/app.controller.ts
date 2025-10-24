import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FunctionalProgrammingServiceMath } from './functionalPrograming.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly functionalProgrammingService: FunctionalProgrammingServiceMath,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello1') // path
  getHello1(): string {
    return 'Helloooooooooo';
  }

  @Get('/functionalProgramming/:math')
  getFunctionalProgramming(@Param('math') math: string): number {
    return this.functionalProgrammingService.get(+math);
  }
}
