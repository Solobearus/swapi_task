import {
  GetPromisesFromURLsObject,
  InitMaxPopulationVehicleResult,
  PopulateCurrentVehicle,
  MaxPopulationVehicle,
} from "../types";
import { getRequest } from "../../../utils/apiHelper";

export const getPromisesFromURLsObject: GetPromisesFromURLsObject = (
  urlsObject
) => {
  return Object.keys(urlsObject).map((url) => getRequest(url));
};

export const initMaxPopulationVehicleResult: InitMaxPopulationVehicleResult = (
  currentVehicleName
) => ({
  population: 0,
  vehicleName: currentVehicleName || "",
  relatedPlanets: [],
  relatedPilots: [],
});

export const populateCurrentVehicle: PopulateCurrentVehicle = (
  currentVehicleName,
  currentVehicle,
  pilots,
  planets
) => {
  const currentVehicleInfo: MaxPopulationVehicle =
    initMaxPopulationVehicleResult(currentVehicleName);

  currentVehicleInfo.population = currentVehicle.reduce(
    (summedPopulation: number, currentPilot) => {
      const mappedPilot = pilots[currentPilot];
      currentVehicleInfo.relatedPilots = [
        ...currentVehicleInfo.relatedPilots,
        mappedPilot.name,
      ];

      const mappedPlanet = planets[mappedPilot.homeworld];
      currentVehicleInfo.relatedPlanets = [
        ...currentVehicleInfo.relatedPlanets,
        {
          name: mappedPlanet.name,
          population: mappedPlanet.population,
        },
      ];

      return isNaN(mappedPlanet.population)
        ? summedPopulation
        : mappedPlanet.population + summedPopulation;
    },
    0
  );
  return currentVehicleInfo;
};
