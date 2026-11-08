import NewspostsRepository from "./NewspostsRepository";
import newspostValidator from "./validator/newspostValidator.js";
import { ValidatorError } from "./errors/ValidatorError.js";
import { NewspostsServiceError } from "./errors/NewspostsServiceError.js";

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
    try {
      return NewspostsRepository.getAll(params);
    } catch (err) {
      throw new NewspostsServiceError("Failed to get newsposts");
    }
  }

  getById(id: string) {
    try {
      return NewspostsRepository.getById(id);
    } catch (error) {
      throw new NewspostsServiceError("Failed to get newspost by ID");
    }
  }

  create(data: CreateNewPost) {
    try {
      const isValid = newspostValidator.create(data);

      if (!isValid) {
        throw new ValidatorError("Invalid newspost data");
      }

      return NewspostsRepository.create(data);
    } catch (err) {
      if (err instanceof ValidatorError) {
        throw err;
      }

      throw new NewspostsServiceError("Failed to create newspost");
    }
  }

  update(id: string, data: UpdateNewPost) {
    try {
      const isValid = newspostValidator.update(data);

      if (!isValid) {
        console.log(newspostValidator.update.errors);
        throw new ValidatorError("Invalid newspost data");
      }

      return NewspostsRepository.update(id, data);
    } catch (err) {
      if (err instanceof ValidatorError) {
        throw err;
      }

      throw new NewspostsServiceError("Failed to update newspost");
    }
  }

  delete(id: string) {
    try {
      return NewspostsRepository.delete(id);
    } catch (err) {
      throw new NewspostsServiceError("Failed to delete newspost");
    }
  }
}

export default new NewspostsService();
