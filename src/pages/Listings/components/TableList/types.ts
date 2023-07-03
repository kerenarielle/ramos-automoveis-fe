import { CarsProps } from "../../../../utils/types/Cars";

export interface TableListProps {
  data: CarsProps[];
  onDelete: Function;
}