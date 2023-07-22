import { AddComment } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { useChatroomsListQuery } from "~src/codegen/graphql";
import { ErrorDialog } from "../common/components/ErrorDialog";
import { ChatroomsList } from "./ChatroomsList";
import { CreateChatroomModal } from "./CreateChatroomModal";

export const ChatroomsPage: React.FC = () => {
  const { data, loading } = useChatroomsListQuery();
  const [showCreateChatroomModal, setShowCreateChatroomModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const chatrooms = data?.chatrooms ?? [];

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h5">Chatrooms</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddComment />}
          onClick={() => setShowCreateChatroomModal(true)}
        >
          New Chatroom
        </Button>
      </Box>
      <ChatroomsList
        loading={loading}
        chatrooms={chatrooms}
        onError={() => {
          setShowError(true);
        }}
      />
      <CreateChatroomModal
        open={showCreateChatroomModal}
        handleClose={() => setShowCreateChatroomModal(false)}
        onError={() => setShowError(true)}
      />
      <ErrorDialog onClose={() => setShowError(false)} open={showError} />
    </Container>
  );
};
