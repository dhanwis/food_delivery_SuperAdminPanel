import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({
  openConfirmation,
  setOpenConfirmation,
  action,
  franchiseData,
  setOpen,
}) => {
  const handleClose = () => {
    setOpenConfirmation(false);
  };

  const handleConfirm = () => {
    action(franchiseData._id);
    setOpen(false);
    setOpenConfirmation(false);
  };

  return (
    <Dialog open={openConfirmation} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to proceed with this action?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
