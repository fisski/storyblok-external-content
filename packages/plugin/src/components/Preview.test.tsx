import { fireEvent, render, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Content } from "./Content.js";
import { Preview } from "./Preview.js";

afterEach(() => {
  mockSetModalOpen.mockClear();
  mockSelectedContent = null;
});

test("should render select content button", () => {
  const { getByTestId } = render(<Preview />);
  expect(getByTestId("select-content")).toBeInTheDocument();
});

test("should open modal when clicked", async () => {
  const { getByTestId } = render(<Preview />);
  const selectContentButton = getByTestId("select-content");
  fireEvent.click(selectContentButton);

  await waitFor(() => {
    expect(mockSetModalOpen).toHaveBeenCalledWith(true);
  });
});

test("should render selected content thumbnail", () => {
  mockSelectedContent = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };

  const { getByTestId } = render(<Preview />);

  expect(getByTestId("thumbnail")).toHaveAttribute(
    "src",
    mockSelectedContent.thumbnailUrl,
  );
});

test("should render selected content title", () => {
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
