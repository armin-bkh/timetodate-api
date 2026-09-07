import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatesModule } from './dates/dates.module';
import { DateRequest } from './dates/date.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'dates.db',
      entities: [DateRequest],
      synchronize: true,
    }),
    DatesModule,
  ],
})
export class AppModule {}
