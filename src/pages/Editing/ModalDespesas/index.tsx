import { FunctionComponent, useCallback, useRef } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import Inputs from "../../../components/Inputs";
import { useForm } from "react-hook-form";
import InputPrice from "../../../components/InputPrice";
import InputDate from "../../../components/InputDate";
import "./index.css";

type DespesasProps = {
  id_despesas: number;
  description: string;
  value: string;
  dt: string;
  id_car: number;
};

type Props = {
  value?: DespesasProps;
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
      onSave(data);
    },
    [onSave]
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
          value={value?.description}
          errors={errors}
          register={register}
          validationSchema={{
            required: "Campo obrigatório",
          }}
        />

        <InputPrice
          label="Valor da despesa"
          value={value?.value}
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
              ? new Date(value.dt).toLocaleDateString("en-CA")
              : ""
          }
          errors={errors}
          register={register}
          validationSchema={{
            required: "Campo obrigatório",
          }}
        />

        {/* <DialogActions> */}
        <div className="actions">
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Deletar</Button>
        </div>
        {/* </DialogActions> */}
      </form>
    </Dialog>
  );
};

export default ModalDespesas;
