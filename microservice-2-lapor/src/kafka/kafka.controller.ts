import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class KafkaController{
    @MessagePattern('lapor-spt')
    handleLaporSpt(@Payload() message: any){
        console.log('kafka menerima lapor spt: ', message );
    }
}