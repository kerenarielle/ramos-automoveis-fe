import React, { FunctionComponent } from "react";

import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

type InputLabelProps = {
  name: string;
  label: string;
  type: string;
  value?: string;
  errors: any;
  register: any;
  validationSchema: any;
};

const InputDate: FunctionComponent<InputLabelProps> = ({
  name,
  label,
  value,
  validationSchema,
  register,
  errors,
  type,
}) => (
  <FormControl fullWidth>
    <TextField
      error={!!errors[name]}
      defaultValue={value}
      helperText={errors[name] !== undefined ? errors[name].message : null}
      id={name}
      type={type}
      label={label}
      {...register(name, validationSchema)}
      InputLabelProps={{ shrink: true }}
    />
  </FormControl>
);

export default InputDate;
