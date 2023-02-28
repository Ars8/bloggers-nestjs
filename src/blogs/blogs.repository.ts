import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blogs-schema';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
  findBlogs(term: string) {
    return [
      { id: 3, name: 'bloger1' },
      { id: 2, name: 'blogik2' },
    ].filter((u) => !term || u.name.indexOf(term) > -1);
  }

  async findBlog(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }
}
