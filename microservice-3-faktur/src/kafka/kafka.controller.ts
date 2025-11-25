import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class KafkaController{
    @MessagePattern('create-faktur')
    handleLaporSpt(@Payload() message: any){
        console.log('kafka menerima pembuatan faktur pajak: ', message );
    }
}