import { Module } from '@nestjs/common';
import { TesttestController } from './testtest.controller';

@Module({
  controllers: [TesttestController]
})
export class TesttestModule {}
