import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('admin')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Delete('clear-db')
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearDatabase() {
    await this.databaseService.clearDatabase();
  }
}