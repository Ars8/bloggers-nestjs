import { Controller, Post, Get, Body, Query } from '@nestjs/common/decorators';
import { queryHandler } from 'src/helpers/queryHandler';
import { PaginationViewType } from 'src/helpers/transformToPaginationView';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { OutputBlogDto } from './dto/output-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsService: BlogsService) {}
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<OutputBlogDto> {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  async findAll(@Query() query: Promise<PaginationViewType<OutputBlogDto>>) {
    return this.blogsService.findAll(queryHandler(query));
  }
}
