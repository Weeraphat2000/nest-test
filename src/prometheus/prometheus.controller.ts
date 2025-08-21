import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { Counter, register } from 'prom-client';
import { Response } from 'express';

export const counter = new Counter({
  name: 'my_counter',
  help: 'My counter help',
  labelNames: ['label1', 'label2'],
});

@Controller('prometheus')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get()
  get() {
    counter.inc({
      label1: 'get',
      label2: 'value2',
    });
    return 'success';
  }

  @Post()
  create() {
    counter.inc({ label1: 'post', label2: 'value2' });
    return 'success';
  }

  @Get('/metrics')
  async findAll(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
    // return register.metrics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    counter.inc({
      label1: 'get',
      label2: id,
    });
    return 'success';
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    counter.inc({
      label1: 'patch',
      label2: id,
    });
    return 'success';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    counter.inc({
      label1: 'delete',
      label2: id,
    });
    return 'success';
  }
}
