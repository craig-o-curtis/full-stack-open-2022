import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlogForm, { AddBlogFormProps } from "../AddBlogForm";
import { IBlog } from "../Blog.types";

import { mockBlogItem, getMockBlogItem } from "./blogTest.utils";

type ComponentProps = Omit<AddBlogFormProps, "blogs" | "onSubmit"> & {
  blogs?: IBlog[];
  onSubmit?: AddBlogFormProps["onSubmit"];
};

const Component = ({
  blogs = [getMockBlogItem()],
  onSubmit = jest.fn(),
  disabled = false,
}) => <AddBlogForm blogs={blogs} onSubmit={onSubmit} disabled={disabled} />;

fdescribe("AddBlogForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userEvent.setup();
  });
  it("should display form defaults", async () => {
    // setup
    render(<Component />);
    // assert
    expect(screen.getByPlaceholderText("Enter title...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title...")).not.toBeDisabled();
    expect(screen.getByPlaceholderText("Enter author...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter author...")).not.toBeDisabled();
    expect(screen.getByPlaceholderText("Enter url...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter url...")).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  fit("should only handle valid form values", async () => {
    // setup
    const submitSpy = jest.fn();
    render(<Component onSubmit={submitSpy} />);

    const titleControl = screen.getByTestId("control-title");
    const authorControl = screen.getByTestId("control-author");
    const urlControl = screen.getByTestId("control-url");

    const titleInput = screen.getByLabelText("Title:");
    const authorInput = screen.getByLabelText("Author:");
    const urlInput = screen.getByLabelText("Url:");

    // assert
    expect(titleControl).toBeInTheDocument();
    expect(authorControl).toBeInTheDocument();
    expect(urlControl).toBeInTheDocument();

    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    // assert - title validation
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
    await userEvent.type(titleInput, "{clear}1{tab}");
    expect(
      await screen.findByText("Length must be 3 or more")
    ).toBeInTheDocument();
    await userEvent.type(titleInput, "{clear}123{tab}");
    expect(
      screen.queryByText("Length must be 3 or more")
    ).not.toBeInTheDocument();

    // assert - author validation
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
    await userEvent.type(authorInput, "{clear}1{tab}");
    expect(
      await screen.findByText("Length must be 3 or more")
    ).toBeInTheDocument();
    await userEvent.type(authorInput, "{clear}123{tab}");
    expect(
      screen.queryByText("Length must be 3 or more")
    ).not.toBeInTheDocument();

    // assert - url validation ** could add proper url validation
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
    await userEvent.type(urlInput, "{clear}1{tab}");
    expect(
      await screen.findByText("Length must be 3 or more")
    ).toBeInTheDocument();
    await userEvent.type(urlInput, "{clear}https://www.example.com{tab}");
    expect(
      screen.queryByText("Length must be 3 or more")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
  });

  it("should enable submission with valid values", async () => {
    // setup
    const submitSpy = jest.fn();
    render(<Component onSubmit={submitSpy} />);

    const titleInput = screen.getByPlaceholderText("Enter title...");
    const authorInput = screen.getByPlaceholderText("Enter author...");
    const urlInput = screen.getByPlaceholderText("Enter url...");

    // assert
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();

    // act
    await userEvent.type(titleInput, "{clear}test title");
    await userEvent.type(authorInput, "{clear}test author");
    await userEvent.type(urlInput, "{clear}http://www.test.com");

    // assert
    const submitButton = await screen.findByRole("button", { name: "Submit" });
    expect(submitButton).not.toBeDisabled();

    // act
    await userEvent.click(submitButton);

    expect(submitSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalledTimes(1);
    const clickPayload = submitSpy.mock.calls[0][0];
    expect(clickPayload).toEqual({
      title: "test title",
      author: "test author",
      url: "http://www.test.com",
    });
  });
});
