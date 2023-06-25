import React, { FunctionComponent } from "react";

import PageContainer from "../../components/PageContainer";
import Form from "../../components/Form";
import carsEmpty from "./utils/carsEmpty";
import api from "../../services/api";

const Adding: FunctionComponent<{}> = () => {
  const onSubmit = (data: any) => {
    setTimeout(async () => {
      await api
        .post("/api/cars/create", { ...data })
        .then((response) => {
          window.location.assign(`/editar/${response.data.id}`);
        })
        .catch(() => null);
    }, 2000);
  };

  return (
    <>
      <PageContainer className="new-car">
        <section>
          <h2>Cadastro de novos veículos</h2>

          <Form value={carsEmpty} onSave={onSubmit} />
        </section>
      </PageContainer>
    </>
  );
};

export default Adding;
