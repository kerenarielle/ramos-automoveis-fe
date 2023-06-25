/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Mui Material
 */
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";

/**
 * Components
 */
import PageContainer from "../../components/PageContainer";
import Form from "../../components/Form";
import ListingsActions from "./Components/ListingsActions";
import ModalDespesas from "./ModalDespesas";

import "./index.css";

/**
 * Utils
 */
import { CarsProps } from "../../utils/types/Cars";
import format from "../../utils/format/priceBrazil";

import api from "../../services/api";

/**
 * Types
 */
import { DespesasProps } from "./ModalDespesas/types";

const EditCar: FunctionComponent<{}> = (props) => {
  const [data, setData] = useState<CarsProps>();
  const [valueTab, setValueTab] = useState("1");
  const [despesas, setDespesas] = useState([]);
  const [despesasEdit, setDespesasEdit] = useState<DespesasProps>({
    id_despesas: undefined,
    description: "",
    value: "",
    dt: "",
    id_car: Number(data?.id_car),
  });
  const [openModal, setOpenModal] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const id = document.location.pathname.split("/editar/")[1];

    async function getInfo() {
      const car = await api.get(`/api/car/${id}`);
      const responseData = car.data;

      const despesasCar = await api.get(`/api/despesas/${id}`);
      const responsedespesasCar = despesasCar.data;

      setData(responseData);
      setDespesas(responsedespesasCar);
    }

    getInfo();
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleSave = useCallback(
    async (value: any) => await api.post("/api/update/car", { ...value }),
    []
  );

  const onDelete = useCallback(async (value: number) => {
    const despesas = await api.delete(`/api/despesas/${value}`);
    const { status } = despesas.data;

    if (status !== 200) {
    }

    window.location.reload();
  }, []);

  const handleEditDespesas = useCallback(
    (id: number) => {
      const edit: DespesasProps = despesas.find(
        ({ id_despesas }) => id_despesas === id
      )!;

      setDespesasEdit(edit);
      setOpenModal(true);
    },
    [despesas]
  );

  const handleSaveDespesas = useCallback(
    async (value: any) => {
      await api.post("/api/update/despesas", {
        ...value,
        id_car: value.id_car || data?.id_car,
      });

      setOpenModal(false);
      window.location.reload();
    },
    [data]
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setDespesasEdit({
      id_despesas: undefined,
      description: "",
      value: "",
      dt: new Date().toDateString(),
      id_car: Number(data?.id_car),
    });
  }, []);

  const total =
    despesas.length > 0
      ? despesas
          .map(({ value }) => parseFloat(value))
          .reduce((accumulator, value) => accumulator + value, 0)
      : 0;

  const handleNew = useCallback(() => {
    setDespesasEdit({
      id_despesas: undefined,
      description: "",
      value: "",
      dt: new Date().toDateString(),
      id_car: Number(data?.id_car),
    });
    setOpenModal(true);
  }, [despesasEdit, data]);

  return (
    <>
      <PageContainer>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Informações do carro" value="1" />
              <Tab label="Lista de despesas" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {data && <Form value={data} onSave={handleSave} ref={formRef} />}
          </TabPanel>
          <TabPanel value="2">
            <div className="container-total">
              <span>Total de despesas {format(total)}</span>
              <Button variant="outlined" onClick={handleNew}>
                + Cadastrar nova despesa
              </Button>
            </div>
            {despesas && (
              <ListingsActions
                despesas={despesas}
                onDelete={onDelete}
                onEdit={handleEditDespesas}
              />
            )}
          </TabPanel>
        </TabContext>

        <ModalDespesas
          open={openModal}
          value={despesasEdit}
          onSave={handleSaveDespesas}
          onClose={handleCloseModal}
        />
      </PageContainer>
    </>
  );
};

export default EditCar;
