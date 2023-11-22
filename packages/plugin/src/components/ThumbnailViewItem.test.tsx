import { fireEvent, render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { ThumbnailViewItem } from "./ThumbnailViewItem.js";

test("should render content thumbnail", () => {
  const content = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };

  const { getByTestId } = render(<ThumbnailViewItem content={content} />);

  expect(getByTestId("thumbnail")).toHaveAttribute("src", content.thumbnailUrl);
});

test("should render content title", () => {
  const content = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };

  const { getByTestId } = render(<ThumbnailViewItem content={content} />);

  expect(getByTestId("title")).toHaveTextContent(content.title);
});

test("should invoke on click callback when clicked", () => {
  const content = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };
  const onSelect = vi.fn();

  const { getByTestId } = render(
    <ThumbnailViewItem
      content={content}
      onSelect={onSelect}
    />,
  );
  fireEvent.click(getByTestId("select-area"));

  expect(onSelect).toHaveBeenCalled();
});

test("should show visual indicator when rendering selected content", () => {
  const content = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };

  const { container } = render(
    <ThumbnailViewItem
      content={content}
      selected={true}
    />,
  );

  expect(container.firstChild).toHaveClass("selected");
});
