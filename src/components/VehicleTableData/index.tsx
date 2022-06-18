import useVehicleTableData from "./hooks/useVehicleTableData";
import SidewaysTable from "../Resusable/SidewaysTable";
import "./style.css";

const VehicleTableData = () => {
  const { resultTableData } = useVehicleTableData();

  return (
    <div className="resultTableWrapper">
      {!resultTableData ? (
        "loading..."
      ) : (
          <SidewaysTable
            data={{
              "Vehicle name with the largest sum" :resultTableData.vehicleName,
              "Related home planets and their respective population": <>
                {resultTableData.relatedPlanets.map((planet) => (
                  <div key={planet.name}>
                    {planet.name}, {planet.population}
                  </div>
                ))}
              </>,
              "Related pilot names": <>
                {resultTableData.relatedPilots.map((pilot) => (
                  <div key={pilot}>{pilot}</div>
                ))}
              </>,
            }}/>
      )}
    </div>
  );
};

export default VehicleTableData;
