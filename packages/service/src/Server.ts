import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import { ContentItem, ContentItemSchema } from "./ContentItem.js";
import { IContentProvider } from "./IContentProvider.js";

export class Server {
  private fastify: FastifyInstance | null = null;
  private contentProvider: IContentProvider;
  private port: number;
  private host: string;

  constructor(
    contentProvider: IContentProvider,
    port: number,
    host: string = "localhost",
  ) {
    this.contentProvider = contentProvider;
    this.port = port;
    this.host = host;
  }

  async start(): Promise<void> {
    if (this.fastify) {
      throw new Error("server already started");
    }

    this.fastify = fastify({});
    await this.fastify.register(cors);
    await this.fastify.register(swagger);
    await this.fastify.register(swaggerUi);

    this.registerGetContentRoute(this.fastify);

    await this.fastify.listen({ port: this.port, host: this.host });
  }

  async close(): Promise<void> {
    if (!this.fastify) {
      throw new Error("server not started");
    }

    await this.fastify.close();
    this.fastify = null;
  }

  getHttpServer(): any {
    if (!this.fastify) {
      throw new Error("server not started");
    }

    return this.fastify.server;
  }

  private registerGetContentRoute(fastify: FastifyInstance): void {
    fastify.get<{ Reply: ContentItem[] }>(
      "/content",
      {
        schema: {
          response: {
            200: {
              type: "array",
              items: ContentItemSchema,
            },
          },
        },
      },
      async (_request, response) => {
        const content = await this.contentProvider.getContent();
        response.code(200).send(content);
      },
    );
  }
}
