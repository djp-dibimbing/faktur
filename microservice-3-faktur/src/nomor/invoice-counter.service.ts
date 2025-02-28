import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InvoiceCounterRepository } from "./invoice-counter.repository";

@Injectable()
export class InvoiceCounterService {
    constructor(
        @InjectRepository(InvoiceCounterRepository)
        private readonly invoiceCounterRepository: InvoiceCounterRepository
    ) {}

    async getNextInvoiceNumber(year: number): Promise<number> {
        return this.invoiceCounterRepository.getAndUpdateCounter(year);
    }
}
