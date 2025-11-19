import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FakturLog, FakturLogSchema } from './faktur-log.schema';
import { FakturLogService } from './faktur-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FakturLog.name, schema: FakturLogSchema },
    ]),
  ],
  providers: [FakturLogService],
  exports: [FakturLogService],
})
export class FakturLogModule {}
