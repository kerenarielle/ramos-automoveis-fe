import { FunctionComponent, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Button, Dialog, DialogTitle } from "@mui/material";

/**
 * Componentes
 */
import Inputs from "../../../../components/Inputs";
import InputPrice from "../../../../components/InputPrice";
import InputDate from "../../../../components/InputDate";

/**
 * Types
 */
import { DespesasProps } from "./types";

import "./index.css";

type Props = {
  value: DespesasProps;
  open: boolean;
  onSave: Function;
  onClose: Function;
};

const ModalDespesas: FunctionComponent<Props> = ({
  open,
  value,
  onClose,
  onSave,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const ref = useRef(null);

  const onSubmit = useCallback(
    (data: any) => {
      onSave({
        ...value,
        ...data,
      });
    },
    [onSave, value]
  );

  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog
      ref={ref}
      open={open}
      onClose={handleClose}
      className="modal-despesas"
    >
      <DialogTitle>Você vai cadastrar/editar uma despesa</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <Inputs
          name="description"
          label="Descrição"
          type="text"
          value={value.description}
          errors={errors}
          register={register}
          validationSchema={{
            required: "Campo obrigatório",
          }}
        />

        <InputPrice
          label="Valor da despesa"
          value={value.value}
          {...register("value", {
            required: "Campo obrigatório",
          })}
          name="value"
          type="text"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Campo obrigatório",
          }}
        />

        <InputDate
          name="dt"
          label="Data da despesa"
          type="date"
          value={
            value && value.dt
              ? format(
                  utcToZonedTime(new Date(value.dt), "America/Sao_Paulo"),
                  "yyyy-MM-dd"
                )
              : ""
          }
          errors={errors}
          register={register}
          validationSchema={{
            required: "Campo obrigatório",
          }}
        />
        <div className="actions">
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalDespesas;
