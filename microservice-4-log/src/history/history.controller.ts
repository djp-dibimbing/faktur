import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async create(@Body() history: Partial<History>) {
    return this.historyService.create(history);
  }

  @Get()
  async findAll() {
    return this.historyService.get();
  }

  @Put(':id')
  async update(@Body() history: Partial<History>, @Param('id') id: string) {
    return this.historyService.update(id, history);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.historyService.delete(id);
  }
}
