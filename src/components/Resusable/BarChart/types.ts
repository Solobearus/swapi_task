import { ChartDataWithHeight } from "../Bar/types";

export type ChartData = Omit<ChartDataWithHeight, "heightPracentage">;

export interface Props {
  data: ChartData[];
}
