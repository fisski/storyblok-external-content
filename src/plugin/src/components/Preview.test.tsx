import { fireEvent, render, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Content } from "./Content.js";
import { Preview } from "./Preview.js";

afterEach(() => {
  mockSetModalOpen.mockClear();
  mockSelectedContent = null;
});

test("should render select video button", () => {
  const { getByTestId } = render(<Preview />);
  expect(getByTestId("select-video")).toBeInTheDocument();
});

test("should open modal when clicked", async () => {
  const { getByTestId } = render(<Preview />);
  const selectVideoButton = getByTestId("select-video");
  fireEvent.click(selectVideoButton);

  await waitFor(() => {
    expect(mockSetModalOpen).toHaveBeenCalledWith(true);
  });
});

test("should render selected video thumbnail", () => {
  mockSelectedContent = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };

  const { getByTestId } = render(<Preview />);

  expect(getByTestId("thumbnail")).toHaveAttribute(
    "src",
    mockSelectedContent.thumbnailUrl,
  );
});

test("should render selected video title", () => {
  mockSelectedContent = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };

  const { getByTestId } = render(<Preview />);

  expect(getByTestId("title")).toHaveTextContent(mockSelectedContent.title);
});

test.skip("should clear selected content");

let mockSelectedContent: Content | null = null;
const mockSetModalOpen = vi.fn();
vi.mock("@storyblok/field-plugin/react", () => ({
  useFieldPlugin: () => ({
    data: {
      content: mockSelectedContent,
    },
    actions: {
      setModalOpen: mockSetModalOpen,
    },
  }),
}));
