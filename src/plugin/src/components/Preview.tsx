import { Button, ImageListItem, ImageListItemBar, Stack } from "@mui/material";
import { useFieldPlugin } from "@storyblok/field-plugin/react";
import { Content } from "./Content.js";

export function Preview() {
  const { data, actions } = useFieldPlugin();
  const content = data.content as Content | null;

  function openModal() {
    actions.setModalOpen(true);
  }

  return (
    <Stack>
      {content && (
        <ImageListItem>
          <img
            data-testid="thumbnail"
            src={content.thumbnailUrl}
            alt={content.title}
            loading="lazy"
            title={content.title}
          />
          <ImageListItemBar
            data-testid="title"
            title={content.title}
          />
        </ImageListItem>
      )}
      <Button
        data-testid="select-video"
        color="primary"
        onClick={openModal}
      >
        Select video
      </Button>
    </Stack>
  );
}
