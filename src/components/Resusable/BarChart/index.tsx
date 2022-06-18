import Bar from "../Bar";
import { useEffect, useState } from "react";
import "./style.css";
import { Props } from "./types";
import { ChartDataWithHeight } from "../Bar/types";

const BarChart = ({ data }: Props) => {
  const [dataDataWithHeight, setDataDataWithHeight] = useState<null | ChartDataWithHeight[]>(null);

  useEffect(() => {
    const maxAmount = data.reduce((previousMaxAmount: number, dataPoint) => {
      return dataPoint.amount > previousMaxAmount
        ? dataPoint.amount
        : previousMaxAmount;
    }, 0);

    const dataDataWithHeight: ChartDataWithHeight[] = data.map((dataPoint) => {
      return {
        ...dataPoint,
        heightPracentage: (dataPoint.amount / maxAmount) * 100,
      };
    });

    setDataDataWithHeight(dataDataWithHeight);
  }, [data]);

  return (
    <div className="barChart">
      <div className="innerBarChart">
        {dataDataWithHeight?.map((dataPoint) => (
          <Bar key={dataPoint.name} data={dataPoint}></Bar>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
