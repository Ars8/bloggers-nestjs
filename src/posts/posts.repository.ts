import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { idMapper } from 'src/helpers/id-mapper';
import { QueryType } from 'src/helpers/queryHandler';
import {
  PaginationViewType,
  transformToPaginationView,
} from 'src/helpers/transformToPaginationView';
import { OutputPostDto } from './dto/output-post.dto';
import { Post, PostDocument } from './entities/post.entity';

const returnNameFromPopulation = (doc) => doc.name;

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
  async findAllPostsForBlog(
    query: QueryType,
    id: string,
  ): Promise<PaginationViewType<OutputPostDto>> {
    const totalCount = await this.postModel.count({ blogId: id });
    const posts = await this.postModel
      .find({ blogId: id })
      .sort([[query.sortBy, query.sortDirection === 'asc' ? 1 : -1]])
      .skip(query.pageSize * (query.pageNumber - 1))
      .limit(query.pageSize)
      .populate({
        path: 'blogName',
        transform: returnNameFromPopulation,
      })
      .lean();
    return transformToPaginationView<OutputPostDto>(
      totalCount,
      query.pageSize,
      query.pageNumber,
      idMapper(posts),
    );
  }
}
