import { Planet } from "./../types";
import { type } from "@testing-library/user-event/dist/type";
import { apiHelper } from "../../../utils/apiHelper";
import {
  pageResult,
  URLObject,
  Pilot,
  Vehicles,
  ResolvedVehicles,
  ResolvedPilots,
  ResolvedPlanets,
  MaxPopulationVehicle,
} from "../types";

export const getVehiclesWithPilotURLs: (
  resolvedVehicles: ResolvedVehicles
) => Promise<ResolvedVehicles> = async (resolvedVehicles) => {
  if (!resolvedVehicles.next) {
    return resolvedVehicles;
  }

  const pageResult: pageResult = await apiHelper(resolvedVehicles.next);

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

export const getPromisesFromURLsObject = (urlsObject: URLObject) => {
  return Object.keys(urlsObject).map((url) => apiHelper(url));
};

export const getPilotsWithPlanets = async (pilotURLs: URLObject) => {
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

export const getPlanets = async (planetURLs: URLObject) => {
  const getPlanetsPromises = getPromisesFromURLsObject(planetURLs);

  const resolvedPlanets = await Promise.all(getPlanetsPromises);

  return resolvedPlanets.reduce((getPlanetsResult: ResolvedPlanets, planet) => {
    const { name, url, population } = planet;
    getPlanetsResult[url] = { name, population: +population };

    return getPlanetsResult;
  }, {});
};

export const calculateSumOfPopulationPerVehicle = (
  vehicles: Vehicles,
  pilots: Record<string, Omit<Pilot, "url">>,
  planets: ResolvedPlanets
) => {
  const maxPopulationVehicle = Object.keys(vehicles).reduce(
    (maxPopulationVehicle: MaxPopulationVehicle, currentVehicleName) => {
      const currentVehicleInfo: MaxPopulationVehicle = {
        population: 0,
        vehicleName: currentVehicleName,
        relatedPlanets: [],
        relatedPilots: [],
      };

      const currentVehicle: string[] = vehicles[currentVehicleName];

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

      if (currentVehicleInfo.population > maxPopulationVehicle.population) {
        return currentVehicleInfo;
      }

      return maxPopulationVehicle;
    },
    {
      population: 0,
      vehicleName: "",
      relatedPlanets: [],
      relatedPilots: [],
    }
  );

  return maxPopulationVehicle;
};