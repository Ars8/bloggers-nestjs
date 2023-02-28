import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({
    required: true,
  })
  pagesCount: number;

  @Prop({
    required: true,
  })
  page: number;

  @Prop({
    required: true,
  })
  pageSize: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
