import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { FilterModalProps } from "./types";
import { useForm } from "react-hook-form";
import { CarsProps } from "../../../utils/types/Cars";
import "./index.css";

function getData(data: any, field: any) {
  const newArray = data.map((fields: { [x: string]: any }) => fields[field]);

  return newArray.filter(function (item: any, pos: any) {
    return newArray.indexOf(item) === pos;
  });
}

const FilterModal: FunctionComponent<FilterModalProps> = ({
  open,
  onClose,
  onFilter,
  data,
}) => {
  const { handleSubmit, register } = useForm<CarsProps>();

  const onSubmit = useCallback(
    (data: any) => {
      onFilter(data);
    },
    [onFilter]
  );

  const handleClose = useCallback(() => onClose(), [onClose]);
  return (
    <Dialog open={open} onClose={handleClose} className="dialog-filter">
      <DialogTitle>Selecione os filtros</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={getData(data, "marca")}
            renderInput={(params) => (
              <TextField
                {...register("marca", {})}
                name="marca"
                {...params}
                label="Marca"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={getData(data, "modelo")}
            renderInput={(params) => (
              <TextField
                {...register("modelo", {})}
                name="modelo"
                {...params}
                label="Modelo"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={getData(data, "ano")}
            renderInput={(params) => (
              <TextField
                {...register("ano", {})}
                name="ano"
                {...params}
                label="Ano"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <div className="actions">
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Filtrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
