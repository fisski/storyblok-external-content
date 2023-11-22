import { Static, Type } from "@sinclair/typebox";

export const ContentItemSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    thumbnailUrl: Type.String(),
  },
  { additionalProperties: true },
);

export type ContentItem = Static<typeof ContentItemSchema>;
