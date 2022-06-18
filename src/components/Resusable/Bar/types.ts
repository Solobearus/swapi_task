export interface ChartDataWithHeight {
  heightPracentage: number;
  name: string;
  amount: number;
}

export interface Props {
  data: ChartDataWithHeight;
}
