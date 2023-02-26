import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsRepository } from './blogs/cats-repository.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsRepository,
  ) {}

  @Get('cats')
  getAllCats() {
    return this.catsService.findAll();
  }
  @Post('cats')
  createCat(@Body() dto) {
    return this.catsService.create(dto);
  }
}
