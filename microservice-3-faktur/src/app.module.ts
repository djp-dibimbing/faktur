import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VatsModule } from './vat/vats.module';
import { InvoiceCounterModule } from './nomor/invoice-counter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VatsModule,
    InvoiceCounterModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
