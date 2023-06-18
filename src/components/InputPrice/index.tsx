import { TextField } from "@mui/material";
import React, { FunctionComponent } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type InputLabelProps = {
  name: string;
  label: string;
  type: string;
  value?: string;
  errors: any;
  register: any;
  validationSchema: any;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="." 
        decimalSeparator=","
        decimalScale={2}
        valueIsNumericString
        prefix="R$"
      />
    );
  },
);

const InputPrice: FunctionComponent<InputLabelProps> = ({ name, label, value, validationSchema, register, errors, type }) => (
  <TextField
    error={!!errors[name]}
    defaultValue={value}
    helperText={!errors[name] ? null : errors[name].message}
    id={name}
    type={type}
    label={label}
    InputProps={{
      inputComponent: NumericFormatCustom as any,
    }}
    {...register(name, validationSchema)}
  />
);

export default InputPrice;