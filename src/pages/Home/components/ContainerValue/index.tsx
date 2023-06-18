import React, { FunctionComponent } from "react";
import { ContainerValueProps } from "./types";
import { Card, CardContent } from "@mui/material";
import "./index.css";

const ContainerValue: FunctionComponent<ContainerValueProps> = ({
  name,
  value,
  className,
}) => {
  return (
    <Card className={`card-component ${className}`} sx={{ minWidth: 275 }}>
      <CardContent className="card-component__container">
        <span>
          {value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span>{name}</span>
      </CardContent>
    </Card>
  );
};

export default ContainerValue;
