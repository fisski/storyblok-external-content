import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ExternalContentFieldPlugin } from "./ExternalContentFieldPlugin";

afterEach(() => {
  mockIsModalOpen = false;
});

test("should render preview when modal is not open", () => {
  mockIsModalOpen = false;

  const { getByTestId, queryByTestId } = render(<ExternalContentFieldPlugin />);

  expect(getByTestId("mock-preview")).toBeInTheDocument();
  expect(queryByTestId("mock-modal")).not.toBeInTheDocument();
});

test("should render modal when modal is open", () => {
  mockIsModalOpen = true;

  const { getByTestId, queryByTestId } = render(<ExternalContentFieldPlugin />);

  expect(getByTestId("mock-modal")).toBeInTheDocument();
  expect(queryByTestId("mock-preview")).not.toBeInTheDocument();
});

let mockIsModalOpen = false;
vi.mock("@storyblok/field-plugin/react", () => ({
  useFieldPlugin: () => ({
    data: {
      isModalOpen: mockIsModalOpen,
    },
  }),
}));

vi.mock("./Modal.js", () => ({
  Modal: () => <div data-testid="mock-modal"></div>,
}));

vi.mock("./Preview.js", () => ({
  Preview: () => <div data-testid="mock-preview"></div>,
}));
