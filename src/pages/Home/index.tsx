import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import PageContainer from "../../components/PageContainer";
import ContainerValue from "./components/ContainerValue";
import { Props } from "./types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import accumulator from "../../utils/accumulator";

import api from "../../services/api";

import "./index.css";

const Home: React.FC = () => {
  const [data, setData] = useState<Props>({
    vendido: [],
    compra: [],
  });

  console.log(data);

  useEffect(() => {
    async function getInfo() {
      const response = await api.get("/api/cars/full");
      const responseData = response.data;

      setData(responseData);
    }

    getInfo();
  }, []);

  return (
    <>
      <PageContainer className="home">
        <div className="cards">
          <ContainerValue
            value={accumulator(
              data.compra.map(({ valor_compra }) => parseInt(valor_compra))
            )}
            name="Comprados no mês"
            className="compra"
          />
          <TableContainer component={Paper}>
            <Table className="min-w-max w-full table-auto">
              <TableHead>
                <TableRow>
                  <TableCell>Marca - Modelo</TableCell>
                  <TableCell>Data da compra</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-gray-600 text-sm font-light">
                {data.compra.map(
                  ({ modelo, marca, dt_compra, valor_compra, id_car }) => (
                    <TableRow
                      className="border-b border-gray-200 hover:bg-gray-100"
                      onClick={() =>
                        window.location.assign(`/editar/${id_car}`)
                      }
                    >
                      <TableCell className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium">{`${marca} - ${modelo}`}</span>
                      </TableCell>
                      <TableCell className="py-3 px-6 text-left">
                        <span>{dt_compra ? dt_compra : ""}</span>
                        <span>
                          {dt_compra
                            ? moment(dt_compra)
                                .tz("America/Sao_Paulo")
                                .format("DD/MM/YYYY")
                            : ""}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 px-6 text-left">
                        <span>
                          R$
                          {valor_compra}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="cards">
          <ContainerValue
            key="venda"
            className="venda"
            name="Vendidos no mês"
            value={accumulator(
              data.vendido.map(({ valor_venda }) =>
                valor_venda ? parseInt(valor_venda) : 0
              )
            )}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Marca - Modelo</TableCell>
                  <TableCell>Data da compra</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-gray-600 text-sm font-light">
                {data.vendido.map(
                  ({ modelo, marca, dt_venda, valor_venda, id_car }) => (
                    <TableRow
                      className="border-b border-gray-200 hover:bg-gray-100"
                      onClick={() =>
                        window.location.assign(`/editar/${id_car}`)
                      }
                    >
                      <TableCell className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium">{`${marca} - ${modelo}`}</span>
                      </TableCell>
                      <TableCell className="py-3 px-6 text-left">
                        <span>{dt_venda ? dt_venda : ""}</span>
                        <span>
                          {dt_venda
                            ? moment(dt_venda)
                                .tz("America/Sao_Paulo")
                                .format("DD/MM/YYYY")
                            : ""}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 px-6 text-left">
                        <span>R$ {valor_venda}</span>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </PageContainer>
    </>
  );
};

export default Home;
