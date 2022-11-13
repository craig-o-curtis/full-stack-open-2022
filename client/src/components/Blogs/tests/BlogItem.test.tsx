import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogItem, { BlogItemProps } from "../BlogItem";
import { IBlog } from "../Blog.types";

const mockBlogItem: IBlog = {
  id: "1",
  title: "test title",
  author: "test author",
  url: "https://www.example.com",
  likes: 0,
  user: "1234",
};

const getMockBlogItem = (overrides?: IBlog): IBlog => ({
  ...mockBlogItem,
  ...overrides,
});

type ComponentProps = Omit<BlogItemProps, "blog" | "onDelete" | "onLike"> & {
  blog?: IBlog;
  onDelete?: BlogItemProps["onDelete"];
  onLike?: BlogItemProps["onLike"];
};

const Component = ({
  blog = getMockBlogItem(),
  onLike = jest.fn(),
  onDelete = jest.fn(),
  currentUserId = getMockBlogItem().user,
}: ComponentProps) => {
  return (
    <BlogItem
      blog={blog}
      onLike={onLike}
      onDelete={onDelete}
      currentUserId={currentUserId}
    />
  );
};

// ** test utils
const expectOpenDetails = async () => {
  userEvent.click(screen.getByRole("button", { name: "Show details" }));
  expect(
    await screen.findByRole("button", { name: "Hide details" })
  ).toBeInTheDocument();
};

describe("BlogItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userEvent.setup();
  });
  it("should render blog item defaults, details hidden by default", async () => {
    // setup
    render(<Component />);

    // assert
    expect(screen.getByText("Title:")).toBeInTheDocument();
    expect(screen.getByText("test title")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show details" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show details" })
    ).not.toBeDisabled();
    expect(screen.queryByText("Author:")).not.toBeInTheDocument();
    expect(screen.queryByText("test author")).not.toBeInTheDocument();
    expect(screen.queryByText("Likes:")).not.toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();

    // act
    await expectOpenDetails();
    expect(screen.getByText("Author:")).toBeInTheDocument();
    expect(screen.getByText("test author")).toBeInTheDocument();
    expect(screen.getByText("Likes:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Link:")).toBeInTheDocument();
    expect(screen.getByText("https://www.example.com")).toBeInTheDocument();
  });

  it("should show working delete button only to creator of blog and not the like button", async () => {
    // setup
    const onDeleteSpy = jest.fn();
    const mockBlog = getMockBlogItem();

    render(
      <Component
        blog={mockBlog}
        currentUserId={mockBlog.user}
        onDelete={onDeleteSpy}
      />
    );
    // assert
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).not.toBeDisabled();
    // act
    await expectOpenDetails();
    expect(screen.queryByText("Like")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Like" })
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDeleteSpy).toHaveBeenCalled();
    expect(onDeleteSpy).toHaveBeenCalledTimes(1);
    const clickPayload = onDeleteSpy.mock.calls[0][0];
    expect(clickPayload).toEqual(mockBlog);
  });

  it("should not show delete button to non-author, but should show working like button", async () => {
    // setup
    const onLikeSpy = jest.fn();
    const mockBlog = getMockBlogItem();
    render(
      <Component blog={mockBlog} currentUserId="12345" onLike={onLikeSpy} />
    );

    // assert
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete" })
    ).not.toBeInTheDocument();
    // act
    await expectOpenDetails();
    const likeButton = screen.getByRole("button", { name: "Like" });
    expect(screen.getByText("Like")).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).not.toBeDisabled();

    // ** 1st click
    await userEvent.click(likeButton);

    expect(onLikeSpy).toHaveBeenCalled();
    expect(onLikeSpy).toHaveBeenCalledTimes(1);
    const clickPayload1 = onLikeSpy.mock.calls[0][0];
    expect(clickPayload1).toEqual(mockBlog);

    // ** 2nd click
    await userEvent.click(likeButton);
    const clickPayload2 = onLikeSpy.mock.calls[1][0];
    expect(onLikeSpy).toHaveBeenCalledTimes(2);
    expect(clickPayload2).toEqual(mockBlog);
  });
});
