import { Edit } from "@mui/icons-material";
import { IconButton, TextareaAutosize, Typography } from "@mui/material";

interface ChatroomDescriptionProps {
  description: string | null;
  isEditable: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  editedDescription: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChatroomDescription: React.FC<ChatroomDescriptionProps> = ({
  description,
  isEditable,
  onEdit,
  onCancel,
  onSave,
  editedDescription,
  onChange,
}) => {
  return (
    <>
      {isEditable ? (
        <>
          <TextareaAutosize
            value={editedDescription}
            onChange={onChange}
            style={{
              width: "100%",
              resize: "none",
              overflow: "hidden",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          />
          <IconButton onClick={onSave}>Save</IconButton>
          <IconButton onClick={onCancel}>Cancel</IconButton>
        </>
      ) : (
        <>
          <Typography variant="body2">
            {description ?? "No description provided."}
          </Typography>
        </>
      )}
    </>
  );
};

export default ChatroomDescription;
