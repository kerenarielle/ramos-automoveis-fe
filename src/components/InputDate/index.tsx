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

const InputDate: FunctionComponent<InputLabelProps> = ({
  name,
  label,
  value,
  validationSchema,
  register,
  errors,
  type,
}) => {
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <TextField
        onChange={handleChange}
        error={!!errors[name]}
        value={inputValue}
        helperText={errors[name] !== undefined ? errors[name].message : null}
        id={name}
        type={type}
        label={label}
        {...register(name, validationSchema)}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  );
};

export default InputDate;
