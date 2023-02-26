import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsRepository } from './blogs/blogs.repository';
import { BlogsService } from './blogs/blogs.service';
import { Cat, CatSchema } from './blogs/cats-schema';
import { CatsRepository } from './blogs/cats-repository.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'nest-cats',
      loggerLevel: 'debug',
    }),
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
    ]),
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService, BlogsService, BlogsRepository, CatsRepository],
})
export class AppModule {}
