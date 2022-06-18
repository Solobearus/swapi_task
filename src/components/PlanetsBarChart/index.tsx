import usePlanetsData from "./hooks/usePlanetsData";
import BarChart from "../Resusable/BarChart";

const VehicleTableData = () => {
  const { planetsChartData } = usePlanetsData();

  return (
    <>
      {!planetsChartData ? (
        "loading..."
      ) : (
        <BarChart data={planetsChartData}></BarChart>
      )}
    </>
  );
};

export default VehicleTableData;
