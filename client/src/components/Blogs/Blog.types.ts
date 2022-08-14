export interface IBlog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: string;
}

export interface IPostBlogPayload {
  title: string;
  author: string;
  url: string;
}
