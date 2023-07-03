import { format } from "date-fns";

import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SelectContainer from "../SelectContainer";
import Marca from "../../utils/Marca";
import Inputs from "../Inputs";
import InputPrice from "../InputPrice";
import InputDate from "../InputDate";
import CheckboxContainer from "../Checkbox";
import { CarsProps } from "../../utils/types/Cars";

import "./index.css";

type FormCarProps = {
  value: CarsProps;
  onSave: Function;
};

const Form: ForwardRefRenderFunction<HTMLFormElement, FormCarProps> = (
  { value, onSave },
  ref
) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CarsProps>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formRef = ref || useRef<HTMLFormElement>(null);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    (data: any) => {
      onSave({ ...data, id_car: value ? value.id_car : undefined });
    },
    [onSave, value]
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="form-container"
    >
      <SelectContainer
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
        name="marca"
        label="Marca"
        value={value.marca.toLowerCase()}
        errors={errors}
      >
        {Marca.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </SelectContainer>

      <Inputs
        name="modelo"
        label="Veículo/Modelo"
        type="text"
        value={value.modelo}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
      />

      <Inputs
        name="cor"
        label="Cor"
        type="text"
        value={value.cor}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
      />

      <Inputs
        name="ano"
        label="Ano"
        type="text"
        value={value.ano}
        errors={errors}
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
      />

      <Inputs
        name="placa"
        label="Placa"
        value={value.placa}
        type="text"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
      />

      <InputPrice
        label="Valor de compra"
        value={value.valor_compra}
        {...register("valor_compra", {
          required: "Campo obrigatório",
        })}
        name="valor_compra"
        type="text"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
      />

      <Inputs
        name="comprador"
        label="Nome do comprador"
        type="text"
        value={value.comprador}
        errors={errors}
        register={register}
        validationSchema={{}}
      />

      <InputPrice
        label="Valor de venda"
        value={value.valor_venda}
        name="valor_venda"
        type="text"
        errors={errors}
        register={register}
        validationSchema={{}}
      />

      <InputDate
        name="dt_compra"
        label="Data da compra"
        type="date"
        value={
          value && value.dt_compra
            ? format(new Date(value.dt_compra), "yyyy-MM-dd")
            : ""
        }
        errors={errors}
        register={register}
        validationSchema={{
          required: "Campo obrigatório",
        }}
      />

      <InputDate
        name="dt_venda"
        label="Data da compra"
        type="date"
        value={
          value && value.dt_venda
            ? format(new Date(value.dt_venda), "yyyy-MM-dd")
            : ""
        }
        errors={errors}
        register={register}
        validationSchema={{}}
      />

      <CheckboxContainer
        name="consignado"
        label="É consiguinado?"
        value={value.consignado}
        errors={errors}
        register={register}
        validationSchema={{}}
      />

      <div className="actions-buttons">
        <Button variant="outlined" type="button" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default forwardRef<HTMLFormElement, FormCarProps>(Form);
