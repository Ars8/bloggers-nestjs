import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { queryHandler } from 'src/helpers/queryHandler';
import { PaginationViewType } from 'src/helpers/transformToPaginationView';
import { OutputPostDto } from 'src/posts/dto/output-post.dto';
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

  @Get(':id/posts')
  async findAllPostsForBlog(
    @Query() query,
    @Param('id') id: string,
  ): Promise<PaginationViewType<OutputPostDto>> {
    const blog = await this.blogsService.findOne(id);
    if (!blog) throw new NotFoundException();
    return this.blogsService.findAllPostsForBlog(queryHandler(query), id);
  }
}
