import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
  constructor(protected blogsRepository: BlogsRepository) {}

  findBlogs(term: string) {
    return this.blogsRepository.findBlogs(term);
  }
}
