import { useFieldPlugin } from "@storyblok/field-plugin/react";
import { ContentService } from "./ContentService.js";
import { Modal } from "./Modal.js";
import { Preview } from "./Preview.js";

export function ExternalContentFieldPlugin() {
  const {
    data: { isModalOpen, options },
  } = useFieldPlugin();

  if (isModalOpen) {
    const serviceUrl = options?.serviceUrl ?? "http://localhost:3000/content";
    const contentService = new ContentService(serviceUrl);
    return <Modal contentService={contentService} />;
  }

  return <Preview />;
}
