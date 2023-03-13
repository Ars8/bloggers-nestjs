import { Inject, Injectable } from '@nestjs/common';
import { QueryType } from 'src/helpers/queryHandler';
import { PaginationViewType } from 'src/helpers/transformToPaginationView';
import { IBlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { OutputBlogDto } from './dto/output-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @Inject('IBlogsRepository') protected blogsRepository: IBlogsRepository,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<OutputBlogDto> {
    return this.blogsRepository.create(createBlogDto);
  }

  async findAll(query: QueryType): Promise<PaginationViewType<OutputBlogDto>> {
    return this.blogsRepository.findAll(query);
  }
}
