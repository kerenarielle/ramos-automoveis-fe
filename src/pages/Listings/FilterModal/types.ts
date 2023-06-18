import { CarsProps } from "../../../utils/types/Cars";

export interface FilterModalProps {
  open: boolean;
  onClose: Function;
  onFilter: Function;
  data: CarsProps[];
}