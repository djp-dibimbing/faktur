import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaSevice {
    constructor(
        @Inject('KAFKA_CLIENT')
        private readonly kafkaClient: ClientKafka,
    ){}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('Create-faktur');
        await this.kafkaClient.connect();
    }

    async send(topic: string, message: any){
        return this.kafkaClient.emit(topic, message);
    }
}
