import {
  CheckCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardProps,
  Collapse,
  IconButton,
  Typography,
  styled,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

import {
  ChatroomDataFragment,
  ChatroomsListDocument,
  useUpdateChatroomMutation,
} from "~src/codegen/graphql";
import { ChatroomContent } from "./ChatroomContent";
import { ChatroomTags } from "./ChatroomTags";
import { ResolveChatroomDialog } from "./ResolveChatroomDialog";

const ChatroomCard = styled(Card)<CardProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}));

export type ChatroomListItemProps = {
  chatroom: ChatroomDataFragment;
  onError: () => void;
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
  onError,
}) => {
  const [updateChatRoom, { error }] = useUpdateChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
  });
  const [showDetails, setShowDetails] = useState(false);
  const [showResolve, setShowResolve] = useState(false);
  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";
  const handleResolveChatroom = (chatroom: ChatroomDataFragment) => {
    setShowResolve(false);
    updateChatRoom({ variables: { resolved: true, id: chatroom.id } }).catch(
      (err) => {
        onError();
      }
    );
  };

  return (
    <>
      <ChatroomCard variant="outlined">
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6">{chatroom.label}</Typography>
            <ChatroomTags
              natureCode={natureCodeName}
              callerPhoneNumber={chatroom.callerPhoneNumber}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            {!chatroom.resolved && (
              <Tooltip title="Resolve">
                <IconButton onClick={() => setShowResolve(true)}>
                  <CheckCircle />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Collapse in={showDetails}>
          <ChatroomContent chatroom={chatroom} onError={onError} />
        </Collapse>
      </ChatroomCard>
      <ResolveChatroomDialog
        open={showResolve}
        onClose={() => setShowResolve(false)}
        onResolve={() => handleResolveChatroom(chatroom)}
      />
    </>
  );
};
