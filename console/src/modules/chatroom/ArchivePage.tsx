import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

import { useArchivedChatroomsListQuery } from "~src/codegen/graphql";
import { ErrorDialog } from "../common/components/ErrorDialog";
import { ChatroomsList } from "./ChatroomsList";

export const ArchivePage: React.FC = () => {
  const { data, loading } = useArchivedChatroomsListQuery();
  const [showError, setShowError] = useState(false);

  const chatrooms = data?.chatrooms ?? [];

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h5">Archive</Typography>
      </Box>
      <ChatroomsList
        loading={loading}
        chatrooms={chatrooms}
        onError={() => {
          setShowError(true);
        }}
      />
      <ErrorDialog onClose={() => setShowError(false)} open={showError} />
    </Container>
  );
};
