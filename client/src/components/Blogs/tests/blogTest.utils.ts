import { IBlog } from "../Blog.types";

export const mockBlogItem: IBlog = {
  id: "1",
  title: "test title",
  author: "test author",
  url: "https://www.example.com",
  likes: 0,
  user: "1234",
};

export const getMockBlogItem = (overrides?: IBlog): IBlog => ({
  ...mockBlogItem,
  ...overrides,
});
