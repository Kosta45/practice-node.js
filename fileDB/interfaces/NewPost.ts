export type NewsGenre = "Politic" | "Business" | "Sport" | "Other";

export interface NewPost {
  id: string;
  title: string;
  text: string;
  genre: NewsGenre;
  isPrivate: boolean;
  createDate: Date;
}

export interface CreateNewPost {
  title: string;
  text: string;
  genre: NewsGenre;
  isPrivate: boolean;
}

export interface UpdateNewPost {
  title?: string;
  text?: string;
  genre?: NewsGenre;
  isPrivate?: boolean;
}
