import { useTheme } from "@emotion/react";
import { ImageList, useMediaQuery } from "@mui/material";
import { Content } from "./Content.js";
import { ThumbnailViewItem } from "./ThumbnailViewItem.js";

export type ThumbnailViewProps = {
  contents: Content[];
  selected?: Content;
  onSelect?: (content: Content) => void;
};

export function ThumbnailView({
  contents,
  selected,
  onSelect,
}: ThumbnailViewProps) {
  const theme = useTheme();
  const columnCount = resolveColumnCount(theme);

  return (
    <ImageList
      cols={columnCount}
      className={"thumbnailview"}
    >
      {contents.map((content) => (
        <ThumbnailViewItem
          key={`item-${content.id}`}
          content={content}
          selected={content.id === selected?.id}
          onSelect={() => onSelect?.(content)}
        />
      ))}
    </ImageList>
  );
}

function resolveColumnCount(theme: any) {
  if (!theme.breakpoints) {
    return 1;
  }

  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  if (isXl) {
    return 5;
  }

  if (isLg) {
    return 4;
  }

  if (isMd) {
    return 3;
  }

  if (isSm) {
    return 2;
  }

  return 1;
}
