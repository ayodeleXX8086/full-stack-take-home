import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

type HeaderProps = {
  noEditIcon: boolean;
  onEditClick: () => void;
};

export const ChatroomItemDescriptionHeader: React.FC<HeaderProps> = ({
  noEditIcon,
  onEditClick,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">Description</Typography>
      {noEditIcon ? (
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
