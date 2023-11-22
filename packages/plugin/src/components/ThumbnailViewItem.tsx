import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Content } from "./Content.js";
import "./ThumbnailViewItem.css";

export type ThumbnailViewItemProps = {
  content: Content;
  selected?: boolean;
  onSelect?: () => void;
};

export function ThumbnailViewItem({
  content,
  onSelect,
  selected,
}: ThumbnailViewItemProps) {
  return (
    <ImageListItem
      className={selected ? "selected" : ""}
      data-testid="select-area"
      onClick={() => onSelect?.()}
    >
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
  );
}
