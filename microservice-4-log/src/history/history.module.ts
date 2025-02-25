import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './history.schema';
import { HistoryController } from './history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
