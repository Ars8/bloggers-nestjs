import { Inject, Injectable } from '@nestjs/common';
import { QueryType } from 'src/helpers/queryHandler';
import { PaginationViewType } from 'src/helpers/transformToPaginationView';
import { OutputPostDto } from 'src/posts/dto/output-post.dto';
import { PostsRepository } from 'src/posts/posts.repository';
import { IBlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { OutputBlogDto } from './dto/output-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @Inject('IBlogsRepository') protected blogsRepository: IBlogsRepository,
    protected postsRepository: PostsRepository,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<OutputBlogDto> {
    return this.blogsRepository.create(createBlogDto);
  }

  async findAll(query: QueryType): Promise<PaginationViewType<OutputBlogDto>> {
    return this.blogsRepository.findAll(query);
  }

  async findOne(id: string): Promise<OutputBlogDto | null> {
    return this.blogsRepository.findOne(id);
  }

  async findAllPostsForBlog(
    query: QueryType,
    id: string,
  ): Promise<PaginationViewType<OutputPostDto>> {
    return this.postsRepository.findAllPostsForBlog(query, id);
  }
}
