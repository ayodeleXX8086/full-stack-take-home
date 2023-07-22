import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

type HeaderProps = {
  isTextEditable: boolean;
  onEditClick: () => void;
};

export const ChatroomItemHeader: React.FC<HeaderProps> = ({
  isTextEditable,
  onEditClick,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">Description</Typography>
      {isTextEditable ? (
        <></>
      ) : (
        <Tooltip title="Edit">
          <IconButton onClick={onEditClick}>
            <Edit aria-label="Edit" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
