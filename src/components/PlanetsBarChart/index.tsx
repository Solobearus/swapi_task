import usePlanetsData from "./hooks/usePlanetsData";
import BarChart from "../Resusable/BarChart";
import Loader from "../Resusable/Loader";
const VehicleTableData = () => {
  const { planetsChartData } = usePlanetsData();

  return (!planetsChartData ? (
    <Loader></Loader>
  ) : (
    <BarChart data={planetsChartData}></BarChart>
  ));
};

export default VehicleTableData;
