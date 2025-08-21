import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ListModule } from './list/list.module';
import { TodolistModule } from './todolist/todolist.module';
import { UserModule } from './user/user.module';
import { PrometheusModule } from './prometheus/prometheus.module';

@Module({
  imports: [TodoModule, ListModule, TodolistModule, UserModule, PrometheusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
