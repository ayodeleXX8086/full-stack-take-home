import { Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  ChatroomDataFragment,
  ChatroomsListDocument,
  useUpdateChatroomMutation,
} from "~src/codegen/graphql";
import { ChatRoomDetailsModal } from "./ChatRoomDetailsModal";
import { ChatroomItemHeader } from "./ChatroomItemHeader";

export type ChatroomContentProps = {
  chatroom: ChatroomDataFragment;
};

export const ChatroomContent: React.FC<ChatroomContentProps> = ({
  chatroom,
}) => {
  const [editedDescription, setEditedDescription] = useState(
    chatroom.description || ""
  );
  const [showError, setShowError] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [updateChatRoom, { error }] = useUpdateChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
  });
  const [isTextEditable, setIsTextEditable] = useState(false);
  const handleSaveDescription = async () => {
    updateChatRoom({
      variables: { id: chatroom.id, description: editedDescription },
    })
      .then((data) => {
        setIsTextEditable(false);
        if (error) {
          setShowError(true);
        }
      })
      .catch((err) => {
        setShowError(true);
      });
  };

  const handleCancelEdit = () => {
    // Reset the editedDescription to the original chatroom.description
    setEditedDescription(chatroom.description || "");
    // Hide the text box and show the description Typography
    setIsTextEditable(false);
  };
  return (
    <>
      {showError && (
        <Alert severity="error" onClose={() => setShowError(false)}>
          Error: Something went wrong while trying to update the description.
        </Alert>
      )}
      <ChatroomItemHeader
        isTextEditable={isTextEditable}
        onEditClick={() => setIsTextEditable(false)}
      />
      {isTextEditable ? (
        <>
          <TextareaAutosize
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            style={{
              width: "100%",
              resize: "none",
              overflow: "hidden",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          />
          <IconButton onClick={handleSaveDescription}>Save</IconButton>
          <IconButton onClick={handleCancelEdit}>Cancel</IconButton>
        </>
      ) : (
        // Otherwise, show the description Typography component
        <>
          <Typography variant="body2">
            {chatroom.description ?? "No description provided."}
          </Typography>
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setViewDetail(true)}
      >
        View Details
      </Button>
      <ChatRoomDetailsModal
        chatroom={chatroom}
        onClose={() => setViewDetail(false)}
        open={viewDetail}
      />
    </>
  );
};
