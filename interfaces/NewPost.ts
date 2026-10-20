export interface NewPost {
  id: number;
  title: string;
  text: string;
  createDate: Date;
}

export interface CreateNewPost {
  title: string;
  text: string;
}

export interface UpdateNewPost {
  title?: string;
  text?: string;
}
