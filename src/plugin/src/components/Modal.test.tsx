import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import { createPromise } from "../testing/createPromise.js";
import { Content } from "./Content.js";
import { IContentService } from "./IContentService.js";
import { Modal } from "./Modal.js";
import { ThumbnailViewProps } from "./ThumbnailView.js";

afterEach(() => {
  mockSelectedContent = null;
  mockSetContent.mockClear();
  mockSetModalOpen.mockClear();
  mockThumbnailView.mockClear();
});

test("should fetch content from service", () => {
  const { contentService } = createMockContentService();
  render(<Modal contentService={contentService} />);

  expect(contentService.getContent).toHaveBeenCalled();
});

test("should view the content", async () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const { contentService, resolveGetContent } = createMockContentService();
  render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));

  expect(mockThumbnailView).toHaveBeenCalledWith(
    expect.objectContaining({ contents }),
  );
});

test("select button should be disabled until content has been selected", () => {
  const { contentService } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  const selectButton = getByTestId("select-button");

  expect(selectButton).toBeDisabled();
});

test("should close modal when select button is clicked", async () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const { contentService, resolveGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));
  await act(() => selectContent(contents[0]));

  const selectButton = getByTestId("select-button");
  fireEvent.click(selectButton);

  expect(mockSetModalOpen).toHaveBeenCalledWith(false);
});

test("should update field data when select button is clicked", async () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const { contentService, resolveGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));
  await act(() => selectContent(contents[0]));

  const selectButton = getByTestId("select-button");
  fireEvent.click(selectButton);

  expect(mockSetContent).toHaveBeenCalledWith(contents[0]);
});

test("should close modal when cancel button is clicked", () => {
  const { contentService } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  const cancelButton = getByTestId("cancel-button");
  fireEvent.click(cancelButton);

  expect(mockSetModalOpen).toHaveBeenCalledWith(false);
});

test("should not modify field data when cancel button is clicked", async () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const { contentService, resolveGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));
  await act(() => selectContent(contents[0]));

  const cancelButton = getByTestId("cancel-button");
  fireEvent.click(cancelButton);

  // wait to validate that mockSetContent will not be called
  // ie. expect waiting for setContent to be called to fail
  await expect(
    waitFor(() => expect(mockSetContent).toHaveBeenCalled(), { timeout: 100 }),
  ).rejects.toThrow();
});

test("should close modal when clear button is clicked", () => {
  const { contentService } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  const clearButton = getByTestId("clear-button");
  fireEvent.click(clearButton);

  expect(mockSetModalOpen).toHaveBeenCalledWith(false);
});

test("should clear field data when clear button is clicked", () => {
  const { contentService } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  const clearButton = getByTestId("clear-button");
  fireEvent.click(clearButton);

  expect(mockSetContent).toHaveBeenCalledWith(null);
});

test("should highlight selected content", async () => {
  mockSelectedContent = { id: 1, title: "title", thumbnailUrl: "thumbnailUrl" };
  const contents = [mockSelectedContent];

  const { contentService, resolveGetContent } = createMockContentService();
  render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));

  expect(mockThumbnailView).toHaveBeenCalledWith(
    expect.objectContaining({ selected: mockSelectedContent }),
  );
});

test("should fuzzily filter visible content based on search term", async () => {
  const contents = [
    { id: 1, title: "partially matching content: abcxz", thumbnailUrl: "" },
    { id: 2, title: "fully matching content: abcxyz", thumbnailUrl: "" },
    { id: 3, title: "mismatching content", thumbnailUrl: "" },
  ];

  const { contentService, resolveGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));

  const filterInput = getByTestId("filter-input").querySelector("input")!;
  fireEvent.change(filterInput, { target: { value: "abcxyz" } });

  expect(mockThumbnailView).toHaveBeenCalledWith(
    expect.objectContaining({ contents: [contents[1], contents[0]] }),
  );
});

test("should treat duplicate clicks as accept selection", async () => {
  const contents = [
    { id: 1, title: "title1", thumbnailUrl: "thumbnailUrl1" },
    { id: 2, title: "title2", thumbnailUrl: "thumbnailUrl2" },
  ];

  const { contentService, resolveGetContent } = createMockContentService();
  render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));
  await act(() => selectContent(contents[0]));

  expect(mockThumbnailView).toHaveBeenCalledWith(
    expect.objectContaining({ selected: contents[0] }),
  );

  await act(() => selectContent(contents[0]));

  expect(mockSetContent).toHaveBeenCalledWith(contents[0]);
  expect(mockSetModalOpen).toHaveBeenCalledWith(false);
});

test("should show loader while fetching videos", () => {
  const { contentService } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  expect(getByTestId("video-loader")).toBeInTheDocument();
});

test("should show message when no videos are available", async () => {
  const { contentService, resolveGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent([]));

  expect(getByTestId("no-videos-message")).toBeInTheDocument();
});

test("should show message when no videos match filter", async () => {
  const contents = [{ id: 1, title: "mismatching content", thumbnailUrl: "" }];

  const { contentService, resolveGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => resolveGetContent(contents));

  const filterInput = getByTestId("filter-input").querySelector("input")!;
  fireEvent.change(filterInput, { target: { value: "abcxyz" } });

  expect(getByTestId("no-matches-message")).toBeInTheDocument();
});

test("should show error message when unable to fetch contents", async () => {
  const errorMessage = "some error";
  const { contentService, rejectGetContent } = createMockContentService();
  const { getByTestId } = render(<Modal contentService={contentService} />);

  await act(() => rejectGetContent(new Error(errorMessage)));

  expect(getByTestId("error-message")).toHaveTextContent(errorMessage);
});

type CreateMockContentServiceResult = {
  contentService: IContentService;
  resolveGetContent: (contents?: Content[]) => Promise<void>;
  rejectGetContent: (error: Error) => Promise<void>;
};

function createMockContentService(): CreateMockContentServiceResult {
  const contentService = {
    getContent: vi.fn(() => createPromise()),
  };

  return {
    contentService: contentService as IContentService,
    async resolveGetContent(contents: Content[] = []) {
      const lastCallIndex = contentService.getContent.mock.results.length - 1;
      await contentService.getContent.mock.results[lastCallIndex].value.resolve(
        contents,
      );
    },
    async rejectGetContent(error: Error) {
      const lastCallIndex = contentService.getContent.mock.results.length - 1;
      await contentService.getContent.mock.results[lastCallIndex].value.reject(
        error,
      );
    },
  };
}

async function selectContent(content: Content) {
  await waitFor(() => {
    expect(mockThumbnailView).toBeCalled();
  });

  const lastCallIndex = mockThumbnailView.mock.calls.length - 1;
  const lastCall = mockThumbnailView.mock.calls[lastCallIndex];
  const props = lastCall[0] as ThumbnailViewProps;
  props.onSelect?.(content);
}

let mockSelectedContent: Content | null = null;
const mockSetContent = vi.fn();
const mockSetModalOpen = vi.fn();
vi.mock("@storyblok/field-plugin/react", () => ({
  useFieldPlugin: () => ({
    data: {
      content: mockSelectedContent,
    },
    actions: {
      setContent: mockSetContent,
      setModalOpen: mockSetModalOpen,
    },
  }),
}));

const mockThumbnailView = vi.fn();
vi.mock("./ThumbnailView.js", () => ({
  ThumbnailView: (props: any) => {
    mockThumbnailView(props);
    return <div data-testid="mock-thumbnail-view"></div>;
  },
}));
