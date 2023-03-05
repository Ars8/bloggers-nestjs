import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Put,
} from '@nestjs/common/decorators';
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
  getBlogTest() {
    return this.blogsService.findBlog();
  }

  @Get()
  async findAll(@Query() query: Promise<PaginationViewType<OutputBlogDto>>) {
    return this.blogsService.findAll(queryHandler(query));
  }

  @Get()
  getBlogs(@Query('term') term: string) {
    return this.blogsService.findBlogs(term);
  }

  @Get(':id')
  getBlog(@Param('id') blogId) {
    return [{ id: 1 }, { id: 2 }].find((u) => u.id === +blogId);
  }

  /* @Post()
  createBlogs(@Body() inputModel: createBlogIntputModelType) {
    return {
      id: 15,
      name: inputModel.name,
      pageCount: inputModel.pageCount,
    };
  } */

  @Delete('id')
  deleteBlog(@Param('id') blogId: string) {
    return;
  }

  @Put(':id')
  updateBlog(
    @Param('id') blogId: string,
    @Body() inputModel: createBlogIntputModelType,
  ) {
    return {
      id: blogId,
      inputModel: inputModel,
    };
  }
}

type createBlogIntputModelType = {
  name: string;
  pageCount: number;
};
