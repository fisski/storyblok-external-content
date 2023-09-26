import { ContentItem } from "./ContentItem.js";

export interface IContentProvider {
  getContent(): Promise<ContentItem[]>;
}
