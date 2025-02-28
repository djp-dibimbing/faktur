import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoiceCounter } from "./dto/invoice-counter.dto";
import { InvoiceCounterRepository } from "./invoice-counter.repository";
import { InvoiceCounterService } from "./invoice-counter.service";

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceCounter])],
    providers: [InvoiceCounterService, InvoiceCounterRepository],
    exports: [InvoiceCounterService]
})
export class InvoiceCounterModule {}
