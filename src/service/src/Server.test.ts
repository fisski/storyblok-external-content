import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import Sinon from "sinon";
import sinonChai from "sinon-chai";
import supertest from "supertest";
import { ContentItem } from "./ContentItem.js";
import { IContentProvider } from "./IContentProvider.js";
import { Server } from "./Server.js";

use(chaiAsPromised);
use(sinonChai);

describe("Server", () => {
  it("should throw when started twice", async () => {
    const server = new Server(createMockContentProvider(), 0);

    await server.start();
    after(() => server.close());

    await expect(server.start()).to.eventually.be.rejected;
  });

  it("should throw when closed without being started", async () => {
    const server = new Server(createMockContentProvider(), 0);

    await expect(server.close()).to.eventually.be.rejected;
  });

  it("should not require authentication", async () => {
    const server = new Server(createMockContentProvider(), 0);

    await server.start();
    after(() => server.close());

    await supertest(server.getHttpServer())
      .get("/content")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  it("should query content from given content provider", async () => {
    const contentProvider = createMockContentProvider();
    const server = new Server(contentProvider, 0);

    await server.start();
    after(() => server.close());

    await supertest(server.getHttpServer()).get("/content");

    expect(contentProvider.getContent).to.have.been.called;
  });

  it("should response with provided content", async () => {
    const providedContent = [
      {
        id: 1,
        title: "title1",
        thumbnailUrl: "https://example.com/img1.jpg",
      },
      {
        id: 2,
        title: "title2",
        thumbnailUrl: "https://example.com/img2.jpg",
      },
    ];

    const contentProvider = createMockContentProvider(providedContent);
    const server = new Server(contentProvider, 0);

    await server.start();
    after(() => server.close());

    const response = await supertest(server.getHttpServer()).get("/content");

    expect(response.body).to.deep.equal(providedContent);
  });

  function createMockContentProvider(
    providedContent: ContentItem[] = [],
  ): IContentProvider {
    return {
      getContent: Sinon.stub().resolves(providedContent),
    };
  }
});
