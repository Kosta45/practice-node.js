export interface NewPost {
  id: string;
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
