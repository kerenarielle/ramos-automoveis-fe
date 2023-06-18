import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React, { FunctionComponent, useCallback } from "react";
import { ExpensesProps } from "../../../../utils/types/Expenses";

type ListingsActionsProps = {
  despesas: ExpensesProps[];
  onEdit: Function;
  onDelete: Function;
};

const ListingsActions: FunctionComponent<ListingsActionsProps> = ({
  despesas,
  onEdit,
  onDelete,
}) => {
  const handleEditDespesas = useCallback(
    (value: any) => onEdit(value),
    [onEdit]
  );

  const onDeleteDespesas = useCallback(
    (value: any) => onDelete(value),
    [onDelete]
  );

  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {despesas.map(({ description, id_despesas, value }) => (
          <ListItem
            key={id_despesas}
            disableGutters
            secondaryAction={[
              <IconButton
                onClick={() => handleEditDespesas(id_despesas)}
                edge="end"
                aria-label="delete"
              >
                <EditIcon />
              </IconButton>,
              <IconButton
                onClick={() => onDeleteDespesas}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>,
            ]}
          >
            <ListItemText primary={description} secondary={`R$ ${value}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListingsActions;
