import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { VatsService } from "./vats.service";
import { VatController } from "./vats.controller";
import { VatsRepository } from "./vats.repository";
import { Vat } from "./dto/vat.entity";
import { JwtStrategy } from "src/auth/jwt.strategy";
@Module({
  imports: [TypeOrmModule.forFeature([Vat])],
  exports: [VatsService],
  controllers: [VatController],
  providers: [VatsService, VatsRepository, JwtStrategy],
})
export class VatsModule {}