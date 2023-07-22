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
import { ErrorDialog } from "../common/components/ErrorDialog";
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
};

export const ChatroomListItem: React.FC<ChatroomListItemProps> = ({
  chatroom,
}) => {
  const [updateChatRoom, { error }] = useUpdateChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
  });
  const [showDetails, setShowDetails] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showResolve, setShowResolve] = useState(false);
  const natureCodeName = chatroom.natureCode?.name ?? "Uncategorized";
  const handleResolveChatroom = (chatroom: ChatroomDataFragment) => {
    setShowResolve(false);
    updateChatRoom({ variables: { resolved: true, id: chatroom.id } })
      .then((data) => {
        if (error) {
          setShowError(true);
        }
      })
      .catch((err) => {
        setShowError(true);
      });
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
          <ChatroomContent chatroom={chatroom} />
        </Collapse>
      </ChatroomCard>
      <ErrorDialog onClose={() => setShowError(false)} open={showError} />
      <ResolveChatroomDialog
        open={showResolve}
        onClose={() => setShowResolve(false)}
        onResolve={() => handleResolveChatroom(chatroom)}
      />
    </>
  );
};
