import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsRepository } from './blogs/blogs.repository';
import { BlogsService } from './blogs/blogs.service';
import { Cat, CatSchema } from './blogs/cats-schema';
import { CatsRepository } from './blogs/cats-repository.service';
import { BlogsModule } from './blogs/blogs.module';
import { Blog, BlogSchema } from './blogs/entities/blog.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'nest-cats',
      loggerLevel: 'debug',
    }),
    BlogsModule,
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [AppController, BlogsController],
  providers: [
    AppService,
    BlogsService,
    BlogsRepository,
    CatsRepository,
    { provide: 'IBlogsRepository', useClass: BlogsRepository },
  ],
})
export class AppModule {}
