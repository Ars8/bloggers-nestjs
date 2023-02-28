import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blogs-schema';
import { BlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    protected blogsRepository: BlogsRepository,
  ) {}

  findBlogs(term: string) {
    return this.blogsRepository.findBlogs(term);
  }

  findBlog() {
    return this.blogsRepository.findBlog();
  }
}
