import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaSevice } from "./kafka.service";
import { KafkaController } from "./kafka.controller";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_CLIENT',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        // brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
                        brokers: ['localhost:9092'],

                    },
                    consumer: {
                        // groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'lapor-consumer-group',
                        groupId: 'faktur-consumer-group',
                    },
                },
            },
        ]),
    ],
    controllers: [KafkaController],
    providers: [KafkaSevice],
    exports: [KafkaSevice],
})
export class KafkaModule {}