import fileDB from "../fileDB/fileDB.js";

import type {
  NewPost,
  CreateNewPost,
  UpdateNewPost,
} from "../fileDB/interfaces/NewPost.js";

type PaginationParams = {
  page: number;
  size: number;
};

const newsPostSchema = {
  id: String,
  title: String,
  text: String,
  genre: String,
  isPrivate: Boolean,
  createDate: Date,
};

fileDB.registerSchema("newspost", newsPostSchema);

const newsTablePosts = fileDB.getTable("newspost");

class NewspostsRepository {
  getAll(params: PaginationParams): NewPost[] {
    const posts = newsTablePosts.getAll();

    const start = params.page * params.size;
    const end = start + params.size;

    return posts.slice(start, end);
  }

  getById(id: string) {
    return newsTablePosts.getById(id);
  }

  create(data: CreateNewPost) {
    return newsTablePosts.create(data);
  }

  update(id: string, data: UpdateNewPost) {
    return newsTablePosts.update(id, data);
  }

  delete(id: string) {
    return newsTablePosts.delete(id);
  }
}

export default new NewspostsRepository();
