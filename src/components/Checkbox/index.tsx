import React, { FunctionComponent } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type CheckboxLabelProps = {
  name: string;
  label: string;
  value: boolean;
  errors: any;
  register: any;
  validationSchema: any;
};

const CheckboxContainer: FunctionComponent<CheckboxLabelProps> = ({
  name,
  label,
  value,
  validationSchema,
  register,
}) => (
  <>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            type="checkbox"
            id={name}
            name={name}
            defaultValue={value}
            checked={value}
            {...register(name, validationSchema)}
          />
        }
        label={label}
      />
    </FormGroup>
  </>
);

export default CheckboxContainer;
