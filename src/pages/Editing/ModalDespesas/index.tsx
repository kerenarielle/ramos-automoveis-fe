import { FunctionComponent, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogTitle } from "@mui/material";

/**
 * Componentes
 */
import Inputs from "../../../components/Inputs";
import InputPrice from "../../../components/InputPrice";
import InputDate from "../../../components/InputDate";

/**
 * Types
 */
import { DespesasProps } from "./types";

import "./index.css";

const options = {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
} as const;

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
          label="Data da despesas"
          type="date"
          value={
            value && value.dt
              ? new Intl.DateTimeFormat("pt-BR", options).format(
                  new Date(value.dt)
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
