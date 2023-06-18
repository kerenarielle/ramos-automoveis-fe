import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/base/TablePagination";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TableListProps } from "./types";
import format from "../../../utils/format/priceBrazil";
import accumulator from "../../../utils/accumulator";

import "./index.css";

function calcula(dateEarlier: Date, dateLater: Date) {
  var one_day = 1000 * 60 * 60 * 24;
  return Math.round((dateLater.getTime() - dateEarlier.getTime()) / one_day);
}

const TableList: React.FC<TableListProps> = ({ data, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="text-center">Ações</TableCell>
              <TableCell className="text-center">Marca</TableCell>
              <TableCell className="text-center">Modelo</TableCell>
              <TableCell className="text-center">Cor</TableCell>
              <TableCell className="text-center">Ano</TableCell>
              <TableCell className="text-center">Placa</TableCell>
              <TableCell className="text-center">Data compra</TableCell>
              <TableCell className="text-center">Data venda</TableCell>
              <TableCell className="text-center">Estoque</TableCell>
              <TableCell className="text-center">Valor Compra</TableCell>
              <TableCell className="text-center">Valor Venda</TableCell>
              <TableCell className="text-center">Total despesas</TableCell>
              <TableCell className="text-center">É consignado?</TableCell>
              <TableCell className="text-center">Lucro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                ({
                  id_car,
                  modelo,
                  marca,
                  cor,
                  ano,
                  placa,
                  dt_venda,
                  dt_compra,
                  consignado,
                  valor_compra,
                  valor_venda,
                  despesas,
                }) => (
                  <TableRow
                    key={id_car}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="actions">
                      <IconButton
                        onClick={() =>
                          window.location.assign(`/editar/${id_car}`)
                        }
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(id_car)}>
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className="text-center">{marca}</TableCell>
                    <TableCell component="th" scope="row">
                      {modelo}
                    </TableCell>
                    <TableCell className="text-center">{cor}</TableCell>
                    <TableCell className="text-center">{ano}</TableCell>
                    <TableCell className="text-center">{placa}</TableCell>
                    <TableCell className="text-center">
                      {dt_compra
                        ? new Date(dt_compra).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      {dt_venda ? new Date(dt_venda).toLocaleDateString() : ""}
                    </TableCell>
                    <TableCell>
                      {dt_compra ? calcula(new Date(dt_compra), new Date()) : 0}{" "}
                      dias
                    </TableCell>
                    <TableCell className="text-center">
                      {format(valor_compra)}
                    </TableCell>
                    <TableCell className="text-center">
                      {valor_venda ? format(valor_venda) : ""}
                    </TableCell>
                    <TableCell>R$ {accumulator(despesas)}</TableCell>
                    <TableCell className="text-center">
                      {consignado ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell className="text-center">
                      R$
                      {valor_venda
                        ? (
                            ((parseInt(valor_venda) - parseInt(valor_compra)) /
                              parseInt(valor_venda)) *
                            100
                          ).toFixed(2)
                        : 0}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage="Linhas por páginas:"
                rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                colSpan={14}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "Linhas por páginas",
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableList;
