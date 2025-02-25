import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryController } from './history/history.controller';
import { HistoryModule } from './history/history.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HistoryModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/dibimbing',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
