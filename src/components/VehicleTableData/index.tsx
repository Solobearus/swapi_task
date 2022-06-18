import useVehicleTableData from "./hooks/useVehicleTableData";
import "./style.css";

const VehicleTableData = () => {
  const { resultTableData } = useVehicleTableData();

  return (
    <div className="resultTableWrapper">
      {!resultTableData ? (
        "loading..."
      ) : (
        <table className="resultTable">
          <tbody>
            <tr>
              <td>Vehicle name with the largest sum</td>
              <td>{resultTableData.vehicleName}</td>
            </tr>
            <tr>
              <td>Related home planets and their respective population</td>
              <td>
                {resultTableData.relatedPlanets.map((planet) => (
                  <div key={planet.name}>
                    {planet.name}, {planet.population}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Related pilot names</td>
              <td>
                {resultTableData.relatedPilots.map((pilot) => (
                  <div key={pilot}>{pilot}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleTableData;
