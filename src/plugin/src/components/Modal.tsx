import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useFieldPlugin } from "@storyblok/field-plugin/react";
import { SearchIcon } from "@storyblok/mui";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { Content } from "./Content.js";
import { IContentService } from "./IContentService.js";
import { ThumbnailView } from "./ThumbnailView.js";

type ModalProps = {
  contentService: IContentService;
};

export function Modal({ contentService }: ModalProps) {
  const { data, actions } = useFieldPlugin();
  const [error, setError] = useState<Error>();
  const [contents, setContents] = useState<Content[]>();
  const [selectedContent, setSelectedContent] = useState<Content>(
    data.content as Content,
  );
  const [filterTerm, setFilterTerm] = useState<string>("");

  useEffect(() => {
    contentService.getContent().then(setContents, setError);
  }, []);

  function acceptSelection() {
    actions.setContent(selectedContent);
    actions.setModalOpen(false);
  }

  function clearSelection() {
    actions.setContent(null);
    actions.setModalOpen(false);
  }

  function cancelSelection() {
    actions.setModalOpen(false);
  }

  return (
    <Stack>
      <Stack
        direction={"row"}
        gap={1}
      >
        <TextField
          variant="standard"
          data-testid="filter-input"
          value={filterTerm}
          onChange={(event) => setFilterTerm(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="secondary"
          size="small"
          data-testid="clear-button"
          onClick={clearSelection}
        >
          Clear
        </Button>
        <Button
          color="secondary"
          size="small"
          data-testid="cancel-button"
          onClick={cancelSelection}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          size="small"
          data-testid="select-button"
          onClick={acceptSelection}
          disabled={!selectedContent}
        >
          Select
        </Button>
      </Stack>
      <Box>
        <ContentView
          contents={contents}
          error={error}
          filteredContents={filterContent(contents ?? [], filterTerm)}
          selectedContent={selectedContent}
          onSelect={(content) => {
            const shouldAcceptSelection = content.id === selectedContent?.id;
            setSelectedContent(content);

            if (shouldAcceptSelection) {
              acceptSelection();
            }
          }}
        />
      </Box>
    </Stack>
  );
}

type ContentViewProps = {
  contents?: Content[];
  error?: Error;
  filteredContents: Content[];
  onSelect: (content: Content) => void;
  selectedContent?: Content;
};

function ContentView({
  contents,
  error,
  filteredContents,
  onSelect,
  selectedContent,
}: ContentViewProps) {
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: "3em" }}>
        <Alert
          severity="error"
          data-testid="error-message"
        >
          {error.message}
        </Alert>
      </Box>
    );
  }

  if (isLoading(contents)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: "3em" }}>
        <CircularProgress data-testid="video-loader" />
      </Box>
    );
  }

  if (!hasContentToShow(contents)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: "3em" }}>
        <Alert
          severity="warning"
          data-testid="no-videos-message"
        >
          No videos available
        </Alert>
      </Box>
    );
  }

  if (!hasContentToShow(filteredContents)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: "3em" }}>
        <Alert
          severity="warning"
          data-testid="no-matches-message"
        >
          No matches found
        </Alert>
      </Box>
    );
  }

  return (
    <ThumbnailView
      contents={filteredContents}
      selected={selectedContent}
      onSelect={onSelect}
    />
  );
}

function isLoading(contents: Content[] | undefined): boolean {
  return contents === undefined;
}

function hasContentToShow(contents: Content[] | undefined): boolean {
  return Array.isArray(contents) && contents.length > 0;
}

function filterContent(contents: Content[], filterTerm: string): Content[] {
  if (!filterTerm) {
    return contents;
  }

  const fuse = new Fuse(contents, {
    isCaseSensitive: false,
    shouldSort: true,
    keys: ["title"],
  });

  return fuse.search(filterTerm).map((result) => result.item);
}
