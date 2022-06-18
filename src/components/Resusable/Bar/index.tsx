import "./style.css";
import { ChartDataWithHeight } from "./types";

const Bar = ({
  data: { name, heightPracentage, amount },
}: {
  data: ChartDataWithHeight,
}) => (
  <div className="bar">
    <div className="bar_name">{name}</div>
    <div
      className="bar_representation"
      style={{ height: `calc(10px + ${heightPracentage}%)` }}
    ></div>
    <div className="bar_amount">{amount}</div>
  </div>
);

export default Bar;
