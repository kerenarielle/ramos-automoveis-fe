import React, { FunctionComponent } from "react";

import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";

type SelectProps = {
  name: string;
  label: string;
  value: string;
  errors: any;
  register: any;
  validationSchema: any;
  children: any,
};

const SelectContainer: FunctionComponent<SelectProps> = ({
  name,
  label,
  value,
  validationSchema,
  register,
  errors,
  children
}) => {
  return (
    <>
      <FormControl fullWidth error={!!errors[name]}>
        <InputLabel id="demo-simple-select-label">Marca</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={value}
          label={label}
          {...register(name, validationSchema)}
        >
          {children}
        </Select>
        {
          errors[name] !== undefined && (
            <FormHelperText>{errors[name].message}</FormHelperText>
          )
        }
      </FormControl>
    </>
  );
};

export default SelectContainer;


