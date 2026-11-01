import NewspostsRepository from "./NewspostsRepository";

import type {
  CreateNewPost,
  UpdateNewPost,
} from "../fileDB/interfaces/NewPost";

type PaginationParams = {
  page: number;
  size: number;
};

class NewspostsService {
  getAll(params: PaginationParams) {
    return NewspostsRepository.getAll(params);
  }

  getById(id: string) {
    return NewspostsRepository.getById(id);
  }

  create(data: CreateNewPost) {
    return NewspostsRepository.create(data);
  }

  update(id: string, data: UpdateNewPost) {
    return NewspostsRepository.update(id, data);
  }

  delete(id: string) {
    return NewspostsRepository.delete(id);
  }
}

export default new NewspostsService();
