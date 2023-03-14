import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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
  findOne: (id: string) => Promise<OutputBlogDto | null>;
}
@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

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
      name: { $regex: query.searchNameTerm },
    });
    const blogs = await this.blogModel
      .find({ name: { $regex: query.searchNameTerm } })
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

  async findOne(id: string): Promise<OutputBlogDto | null> {
    if (!isValidObjectId(id)) return null;
    const blog = await this.blogModel.findById(id).lean();
    return idMapper(blog);
  }

  /* async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  } */
}
