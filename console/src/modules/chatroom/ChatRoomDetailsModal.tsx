import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ChatroomDataFragment,
  ChatroomsListDocument,
  useCreateChatroomnotesMutation,
  useDeleteChatroomnotesMutation,
} from "~src/codegen/graphql";
import { Delete } from "@mui/icons-material";
import AddNoteSection from "./AddNoteSection";

interface ChatRoomDetailsProps {
  chatroom: ChatroomDataFragment;
  open: boolean;
  onClose: () => void;
}

export const ChatRoomDetailsModal: React.FC<ChatRoomDetailsProps> = ({
  chatroom,
  open,
  onClose,
}) => {
  const { callerPhoneNumber, label, id, chatroomnotes, natureCode } = chatroom;
  const [saveChatRoomNote] = useCreateChatroomnotesMutation({
    refetchQueries: [ChatroomsListDocument],
  });
  const [deleteChatRoomNote] = useDeleteChatroomnotesMutation({
    refetchQueries: [ChatroomsListDocument],
  });
  const parseFriendlyDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const [showNote, setShowNote] = useState(false);
  const onSave = (note: string) => {
    saveChatRoomNote({ variables: { note, chatroomId: id } });
    setShowNote(false);
  };
  const onDelete = (chatroomnoteId: string) => {
    deleteChatRoomNote({ variables: { chatroomnoteId, chatroomId: id } });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Phone Number: {callerPhoneNumber}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nature Code: {natureCode?.name || "unknown"}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setShowNote(true);
          }}
        >
          Add Chat Room Note
        </Button>
        {showNote && (
          <AddNoteSection
            onCancel={() => {
              setShowNote(false);
            }}
            onSave={onSave}
          />
        )}
        <>
          {chatroomnotes?.map((chatroomnote) => (
            <Box key={chatroomnote.id} mt={2} border="1px solid #ccc" p={2}>
              <Typography variant="body2">{chatroomnote.note}</Typography>
              <Typography variant="caption">
                {parseFriendlyDate(chatroomnote.createdAt)}
              </Typography>
              <Tooltip title="Delete note">
                <IconButton
                  onClick={() => {
                    onDelete(chatroomnote.id);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
