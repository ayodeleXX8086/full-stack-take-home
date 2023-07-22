import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export type ResolveChatroomDialogProps = {
  open: boolean;
  onClose: () => void;
  onResolve: () => void;
};

export const ResolveChatroomDialog: React.FC<ResolveChatroomDialogProps> = ({
  open,
  onClose,
  onResolve,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Resolution</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to resolve this ChatRoom?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onResolve} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
