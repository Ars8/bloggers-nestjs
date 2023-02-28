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
import { BlogsService } from './blogs.service';

@Controller('api')
export class BlogsController {
  constructor(protected blogsService: BlogsService) {}
  @Get('blog')
  getBlogTest() {
    return this.blogsService.findBlog();
  }

  @Get('blogs')
  getBlogs(@Query('term') term: string) {
    return this.blogsService.findBlogs(term);
  }

  @Get(':id')
  getBlog(@Param('id') blogId) {
    return [{ id: 1 }, { id: 2 }].find((u) => u.id === +blogId);
  }

  @Post()
  createBlogs(@Body() inputModel: createBlogIntputModelType) {
    return {
      id: 15,
      name: inputModel.name,
      pageCount: inputModel.pageCount,
    };
  }

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
