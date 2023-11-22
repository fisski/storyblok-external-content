import { IContentService } from "./IContentService.js";

export class FakeContentService implements IContentService {
  async getContent() {
    const result = [];
    for (let i = 0; i < 25; ++i) {
      var id = i + 1;
      result.push({
        id,
        title: `content ${id}`,
        thumbnailUrl: `https://placehold.co/600x400?text=${id}`,
      });
    }

    return result;
  }
}
