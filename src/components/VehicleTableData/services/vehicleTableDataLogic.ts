import { getRequest } from "../../../utils/apiHelper";
import {
  getPromisesFromURLsObject,
  initMaxPopulationVehicleResult,
  populateCurrentVehicle,
} from "./helpers";
import {
  pageResult,
  Pilot,
  ResolvedPilots,
  ResolvedPlanets,
  MaxPopulationVehicle,
  CalculateSumOfPopulationPerVehicle,
  GetPlanets,
  GetPilotsWithPlanets,
  GetVehiclesWithPilotURLs,
} from "../types";

export const getVehiclesWithPilotURLs: GetVehiclesWithPilotURLs = async (
  resolvedVehicles
) => {
  if (!resolvedVehicles.next) {
    return resolvedVehicles;
  }

  const pageResult: pageResult = await getRequest(resolvedVehicles.next);

  pageResult?.results?.forEach((vehicle) => {
    resolvedVehicles.vehicles[vehicle.name] = vehicle.pilots;
    vehicle.pilots.forEach((pilot) => {
      return (resolvedVehicles.pilotURLs[pilot] = null);
    });
  });

  resolvedVehicles.next = pageResult.next;

  const result = await getVehiclesWithPilotURLs(resolvedVehicles);
  return result;
};

export const getPilotsWithPlanetURLs: GetPilotsWithPlanets = async (
  pilotURLs
) => {
  const getPilotPromises = getPromisesFromURLsObject(pilotURLs);

  const resolvedPilots: Pilot[] = await Promise.all(getPilotPromises);

  return resolvedPilots.reduce(
    (resolvedPilots: ResolvedPilots, pilot) => {
      const { name, url, homeworld } = pilot;

      resolvedPilots.pilots[url] = { name, homeworld };
      resolvedPilots.planetURLS[homeworld] = null;

      return resolvedPilots;
    },
    {
      pilots: {},
      planetURLS: {},
    }
  );
};

export const getPlanets: GetPlanets = async (planetURLs) => {
  const getPlanetsPromises = getPromisesFromURLsObject(planetURLs);

  const resolvedPlanets = await Promise.all(getPlanetsPromises);

  return resolvedPlanets.reduce((getPlanetsResult: ResolvedPlanets, planet) => {
    const { name, url, population } = planet;
    getPlanetsResult[url] = {
      name,
      population: +(population === "unknown" ? 0 : population),
    };

    return getPlanetsResult;
  }, {});
};

export const calculateSumOfPopulationPerVehicle: CalculateSumOfPopulationPerVehicle =
  (vehicles, pilots, planets) => {
    const maxPopulationVehicle = Object.keys(vehicles).reduce(
      (maxPopulationVehicle: MaxPopulationVehicle, currentVehicleName) => {
        const populatedVehicle = populateCurrentVehicle(
          currentVehicleName,
          vehicles[currentVehicleName],
          pilots,
          planets
        );

        if (populatedVehicle.population > maxPopulationVehicle.population) {
          return populatedVehicle;
        }

        return maxPopulationVehicle;
      },
      initMaxPopulationVehicleResult()
    );

    return maxPopulationVehicle;
  };
