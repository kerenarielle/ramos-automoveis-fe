import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import Transition from "../Transition";
import { ModalRemoveProps } from "./types";

const ModalRemove: FunctionComponent<ModalRemoveProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleDelete = useCallback(() => onDelete(), [onDelete]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Deseja realmente remover?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleDelete}>Deletar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalRemove;
