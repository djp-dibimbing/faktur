import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async create(@Body() history: Partial<History>) {
    return this.historyService.create(history);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.historyService.get();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Body() history: Partial<History>, @Param('id') id: string) {
    return this.historyService.update(id, history);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.historyService.delete(id);
  }
}
