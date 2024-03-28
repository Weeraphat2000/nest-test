import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TesttestModule } from './testtest/testtest.module';

@Module({
  controllers: [TodolistController],
  imports: [TesttestModule]
})
export class TodolistModule {}
