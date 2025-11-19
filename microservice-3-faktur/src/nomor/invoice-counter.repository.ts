import { Repository, DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InvoiceCounter } from "./dto/invoice-counter.entity";

@Injectable()
export class InvoiceCounterRepository extends Repository<InvoiceCounter> {
    constructor(private dataSource: DataSource) {
        super(InvoiceCounter, dataSource.createEntityManager());
    }

    async getAndUpdateCounter(year: number): Promise<number> {
        let counter = await this.findOne({ where: { year } });

        if (!counter) {
            counter = this.create({ year, last_number: 1 });
        } else {
            counter.last_number += 1;
        }

        await this.save(counter);
        return counter.last_number;
    }
}
