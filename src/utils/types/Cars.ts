export interface CarsProps {
  id_car: string;
  modelo: string;
  marca: string;
  cor: string;
  ano: string;
  placa: string;
  valor_compra: string;
  consignado: boolean;
  valor_venda?: string;
  dt_venda?: string;
  dt_compra?: string;
  comprador?: string;
  despesas: Array<number>;
};