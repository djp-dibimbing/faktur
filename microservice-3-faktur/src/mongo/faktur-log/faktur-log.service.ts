import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FakturLog } from "./faktur-log.schema";
import { Model } from "mongoose";

@Injectable()
export class FakturLogService {

    constructor(
        @InjectModel(FakturLog.name)
        private fakturLogModel: Model<FakturLog>,
    ){}

    async createLog(data: any){
        return await this.fakturLogModel.create(data);
    }

    async updateLog(data: any){
        return await this.fakturLogModel.create(data)
    }
}