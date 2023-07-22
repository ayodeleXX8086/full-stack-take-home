import { Box, Card, Modal } from "@mui/material";
import {
  ChatroomsListDocument,
  useCreateChatroomMutation,
} from "~src/codegen/graphql";
import {
  CreateChatroomForm,
  CreateChatroomFormProps,
} from "./CreateChatroomForm";

export type CreateChatroomModalProps = {
  open: boolean;
  handleClose: () => void;
  onError: () => void;
};

export const CreateChatroomModal: React.FC<CreateChatroomModalProps> = ({
  open,
  handleClose,
  onError,
}) => {
  const [createChatroom] = useCreateChatroomMutation({
    refetchQueries: [ChatroomsListDocument],
  });

  const handleSubmit: CreateChatroomFormProps["onSubmit"] = async (
    variables
  ) => {
    createChatroom({ variables }).catch((err) => {
      onError();
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ inset: 0 }}
      >
        <Card variant="outlined" sx={{ minWidth: 400, padding: 2 }}>
          {open && (
            <CreateChatroomForm
              onSubmit={handleSubmit}
              handleClose={handleClose}
            />
          )}
        </Card>
      </Box>
    </Modal>
  );
};
