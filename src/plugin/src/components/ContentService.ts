import { Content } from "./Content.js";
import { IContentService } from "./IContentService.js";

export class ContentService implements IContentService {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  async getContent(): Promise<Content[]> {
    const response = await fetch(this.source);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch contents: ${response.status} - ${response.statusText}`,
      );
    }

    return response.json() as Promise<Content[]>;
  }
}
