import { Alert } from "@mui/material";
import { useState } from "react";
import {
  ChatroomDataFragment,
  ChatroomsListDocument,
  useUpdateChatroomMutation,
} from "~src/codegen/graphql";
import { ChatRoomDetailsModal } from "./ChatRoomDetailsModal";
import ChatroomDescription from "./ChatroomDescription";
import ViewDetailsButton from "./ViewDetailsButton";
import { ChatroomItemDescriptionHeader } from "./ChatroomItemDescriptionHeader";

export type ChatroomContentProps = {
  chatroom: ChatroomDataFragment;
  onError: () => void;
};

export const ChatroomContent: React.FC<ChatroomContentProps> = ({
  chatroom,
  onError,
}) => {
  const [editedDescription, setEditedDescription] = useState(
    chatroom.description || ""
  );
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
          onError();
        }
      })
      .catch((err) => {
        onError();
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
      <ChatroomItemDescriptionHeader
        noEditIcon={isTextEditable}
        onEditClick={() => setIsTextEditable(true)}
      />
      <ChatroomDescription
        description={chatroom.description ?? "No description provided."}
        isEditable={isTextEditable}
        onEdit={() => setIsTextEditable(true)}
        onCancel={handleCancelEdit}
        onSave={handleSaveDescription}
        editedDescription={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <ViewDetailsButton onClick={() => setViewDetail(true)} />
      <ChatRoomDetailsModal
        chatroom={chatroom}
        onClose={() => setViewDetail(false)}
        open={viewDetail}
      />
    </>
  );
};
