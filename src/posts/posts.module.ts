import { Module } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { Blog, BlogSchema } from '../blogs/entities/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  providers: [PostsRepository],
})
export class PostsModule {}
