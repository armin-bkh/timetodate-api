import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateRequest } from './date.entity';
import { DatesService } from './dates.service';
import { DatesController } from './dates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DateRequest])],
  controllers: [DatesController],
  providers: [DatesService],
})
export class DatesModule {}
