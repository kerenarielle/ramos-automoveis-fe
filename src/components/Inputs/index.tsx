import React, { FunctionComponent, useEffect, useState } from "react";

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

const Inputs: FunctionComponent<InputLabelProps> = ({
  name,
  label,
  value,
  validationSchema,
  register,
  errors,
  type,
}) => {
  const [defaultValue, setDefaultValue] = useState<string | undefined>(value);

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <TextField
        error={!!errors[name]}
        defaultValue={defaultValue}
        helperText={errors[name] !== undefined ? errors[name].message : null}
        id={name}
        type={type}
        label={label}
        {...register(name, validationSchema)}
      />
    </FormControl>
  );
};

export default Inputs;
