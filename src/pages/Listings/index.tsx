/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { CarsProps } from "../../utils/types/Cars";

import PageContainer from "../../components/PageContainer";
import ModalRemove from "../../components/ModalRemove";
import TableList from "./TableList";
import FilterModal from "./FilterModal";

import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Button, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

import "./index.css";
import api from "../../services/api";

const Listings: React.FC = () => {
  const [data, setData] = useState<CarsProps[]>([]);
  const [dataDefault, setDataDefault] = useState<CarsProps[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteCar, setDeleteCar] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [tag, setTag] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/api/cars");

      const responseData = response.data;

      setData(responseData);
      setDataDefault(responseData);
    };

    getData();
  }, []);

  const handleSelectDelete = useCallback(
    (value: string) => {
      setDeleteCar(value);
      setOpen(true);
    },
    [deleteCar, open]
  );

  const handleClose = useCallback(() => {
    setDeleteCar("");
    setOpen(false);
  }, [deleteCar, open]);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, [openFilter]);

  const handleOnDelete = useCallback(async () => {
    setOpen(false);

    await api.delete(`/api/cars/${deleteCar}`);

    window.location.reload();
  }, [open]);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, [openFilter]);

  const handleDelete = () => {
    setDataDefault(data);
    setTag("");
  };

  const handleFilter = useCallback(
    (value: any) => {
      const { marca, modelo, ano } = value;

      const results = data.filter((carro) => {
        if (marca && carro.marca.toLowerCase() !== marca.toLowerCase()) {
          return false;
        }

        if (modelo && carro.modelo.toLowerCase() !== modelo.toLowerCase()) {
          return false;
        }

        if (ano && carro.ano !== ano) {
          return false;
        }

        return true;
      });

      setDataDefault(results);
      setOpenFilter(false);
      setTag(Object.keys(value).toString());
    },
    [data]
  );

  return (
    <PageContainer>
      <section>
        <Typography variant="h6">Lista de veículos cadastrados</Typography>
        <div className="actions-filters">
          {tag && (
            <Chip
              label={tag}
              variant="outlined"
              color="primary"
              onDelete={handleDelete}
            />
          )}
          <Button
            variant="outlined"
            onClick={handleOpenFilter}
            startIcon={<FilterAltOutlinedIcon />}
          >
            Filtrar
          </Button>
          <Button
            variant="contained"
            onClick={() => window.location.assign("/adicionar")}
            endIcon={<AddIcon />}
          >
            Adicionar carro
          </Button>
        </div>
      </section>
      <TableList data={dataDefault} onDelete={handleSelectDelete} />

      <FilterModal
        open={openFilter}
        data={data}
        onClose={handleCloseFilter}
        onFilter={handleFilter}
      />

      <ModalRemove
        open={open}
        onClose={handleClose}
        onDelete={handleOnDelete}
      />
    </PageContainer>
  );
};

export default Listings;
