import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsRepository {
  findBlogs(term: string) {
    return [
      { id: 3, name: 'bloger1' },
      { id: 2, name: 'blogik2' },
    ].filter((u) => !term || u.name.indexOf(term) > -1);
  }
}
