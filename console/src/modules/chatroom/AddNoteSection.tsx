import React, { useState } from "react";
import { IconButton, TextareaAutosize } from "@mui/material";

interface AddNoteSectionProps {
  onSave: (note: string) => void;
  onCancel: () => void;
}

const AddNoteSection: React.FC<AddNoteSectionProps> = ({
  onSave,
  onCancel,
}) => {
  const [chatroomNote, setChatroomNote] = useState("");

  const handleNoteSave = () => {
    onSave(chatroomNote);
  };

  const handleNoteCancel = () => {
    onCancel();
    setChatroomNote("");
  };

  return (
    <>
      <TextareaAutosize
        value={chatroomNote}
        onChange={(e) => setChatroomNote(e.target.value)}
        style={{
          width: "100%",
          resize: "none",
          overflow: "hidden",
          fontFamily: "inherit",
          fontSize: "inherit",
        }}
      />
      <IconButton onClick={handleNoteSave}>Add Note</IconButton>
      <IconButton onClick={handleNoteCancel}>Cancel</IconButton>
    </>
  );
};

export default AddNoteSection;
