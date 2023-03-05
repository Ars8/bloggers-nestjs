import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { idMapper } from 'src/helpers/id-mapper';
import { QueryType } from 'src/helpers/queryHandler';
import {
  PaginationViewType,
  transformToPaginationView,
} from 'src/helpers/transformToPaginationView';
import { CreateBlogDto } from './dto/create-blog.dto';
import { OutputBlogDto } from './dto/output-blog.dto';
import { Blog, BlogDocument } from './entities/blog.entity';

export interface IBlogsRepository {
  create: (createBlogDto: CreateBlogDto) => Promise<OutputBlogDto>;
  findAll: (query: QueryType) => Promise<PaginationViewType<OutputBlogDto>>;
  findBlogs: (term: string) => Promise<PaginationViewType<OutputBlogDto>>;
  findBlog;
}
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

  async create(createBlogDto): Promise<OutputBlogDto> {
    const createdBlog = new this.blogModel({
      ...createBlogDto,
      createdAt: new Date().toISOString(),
      isMembership: true,
    });
    await createdBlog.save();
    return idMapper(createdBlog.toObject());
  }

  async findAll(query: QueryType): Promise<PaginationViewType<OutputBlogDto>> {
    const totalCount = await this.blogModel.count({
      name: { $regex: query.searchNameTerm, $option: '-i' },
    });
    const blogs = await this.blogModel
      .find({ name: { $regex: query.searchNameTerm, $options: '-i' } })
      .sort([[query.sortBy, query.sortDirection === 'asc' ? 1 : -1]])
      .skip(query.pageSize * (query.pageNumber - 1))
      .limit(query.pageSize)
      .lean();
    return transformToPaginationView<OutputBlogDto>(
      totalCount,
      query.pageSize,
      query.pageNumber,
      idMapper(blogs),
    );
  }
}
