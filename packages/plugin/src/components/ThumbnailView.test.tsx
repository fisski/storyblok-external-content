import { render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { Content } from "./Content.js";
import { ThumbnailView } from "./ThumbnailView.js";
import { ThumbnailViewItemProps } from "./ThumbnailViewItem.js";

afterEach(() => {
  mockThumbnailViewItem.mockClear();
});

test("should view contents", () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  render(<ThumbnailView contents={contents} />);

  for (const content of contents) {
    expect(mockThumbnailViewItem).toHaveBeenCalledWith(
      expect.objectContaining({ content }),
    );
  }
});

test("should highlight selected content", () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const selectedContent = contents[0];
  const notSelectedContent = contents[1];

  render(
    <ThumbnailView
      contents={contents}
      selected={selectedContent}
    />,
  );

  expect(mockThumbnailViewItem).toHaveBeenCalledWith(
    expect.objectContaining({
      content: selectedContent,
      selected: true,
    }),
  );
  expect(mockThumbnailViewItem).toHaveBeenCalledWith(
    expect.objectContaining({
      content: notSelectedContent,
      selected: false,
    }),
  );
});

test("should notify when content has been selected", () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const onSelect = vi.fn();

  render(
    <ThumbnailView
      contents={contents}
      onSelect={onSelect}
    />,
  );

  selectContent(contents[0]);

  expect(onSelect).toHaveBeenCalledWith(contents[0]);
});

function selectContent(content: Content) {
  for (const call of mockThumbnailViewItem.mock.calls) {
    const props = call[0] as ThumbnailViewItemProps;
    if (props.content === content) {
      props.onSelect!();
      return;
    }
  }
}

const mockThumbnailViewItem = vi.fn();
vi.mock("./ThumbnailViewItem.js", () => ({
  ThumbnailViewItem: (props: any) => {
    mockThumbnailViewItem(props);
    return <div data-testid="mock-thumbnail-view"></div>;
  },
}));
