import { Content } from "./Content.js";

export type IContentService = {
  getContent(): Promise<Content[]>;
};
