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
import ChatroomDescription from "./ChatroomDescription";
import { ChatroomItemDescriptionHeader } from "./ChatroomItemDescriptionHeader";

interface ChatRoomDetailsProps {
  chatroom: ChatroomDataFragment;
  open: boolean;
  onClose: () => void;
  onError: () => void;
}

export const ChatRoomDetailsModal: React.FC<ChatRoomDetailsProps> = ({
  chatroom,
  open,
  onClose,
  onError,
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
  const noop = () => {
    // Do nothing
  };
  const onSave = async (note: string) => {
    saveChatRoomNote({ variables: { note, chatroomId: id } }).catch((err) => {
      onError();
    });
    setShowNote(false);
  };
  const onDelete = async (chatroomnoteId: string) => {
    deleteChatRoomNote({ variables: { chatroomnoteId, chatroomId: id } }).catch(
      (err) => {
        onError();
      }
    );
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
        <Box>
          <ChatroomItemDescriptionHeader noEditIcon={true} onEditClick={noop} />
          <ChatroomDescription
            description={chatroom.description ?? "No description provided."}
            isEditable={false}
            onEdit={noop}
            onCancel={noop}
            onSave={noop}
            editedDescription={
              chatroom.description ?? "No description provided."
            }
            onChange={noop}
          />
        </Box>
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
