import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/posts/entities/post.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { BlogsController } from './blogs.controller';
import { BlogsRepository } from './blogs.repository';
import { BlogsService } from './blogs.service';
import { Blog, BlogSchema } from './entities/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    { provide: 'IBlogsRepository', useClass: BlogsRepository },
    PostsRepository,
  ],
})
export class BlogsModule {}
