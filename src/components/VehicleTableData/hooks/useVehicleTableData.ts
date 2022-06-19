import { useEffect, useState } from "react";
import {
  getVehiclesWithPilotURLs,
  getPilotsWithPlanetURLs,
  getPlanets,
  calculateSumOfPopulationPerVehicle,
} from "../services/vehicleTableDataLogic";
import { MaxPopulationVehicle } from "../types";

const useVehicleTableData = () => {
  const [resultTableData, setResultTableData] =
    useState<null | MaxPopulationVehicle>(null);

  useEffect(() => {
    calculateMaxPopulationPerVehicles();
  }, []);

  const calculateMaxPopulationPerVehicles = async () => {
    const { vehicles, pilotURLs } = await getVehiclesWithPilotURLs({
      vehicles: {},
      pilotURLs: {},
      next: "https://swapi.py4e.com/api/vehicles/",
    });
    const { pilots, planetURLS } = await getPilotsWithPlanetURLs(pilotURLs);
    const planets = await getPlanets(planetURLS);
    const vehicleWithMaxPopulationData = calculateSumOfPopulationPerVehicle(
      vehicles,
      pilots,
      planets
    );

    setResultTableData(vehicleWithMaxPopulationData);
  };

  return { resultTableData };
};

export default useVehicleTableData;
