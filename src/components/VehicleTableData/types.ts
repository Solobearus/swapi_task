export type URLObject = Record<string, null>;
export type PageResults = { pilots: string[]; name: string }[];
export type Pilot = { name: string; url: string; homeworld: string };
export type Planet = { name: string; population: number };
export type ResolvedPlanets = Record<string, Planet>;
export type Vehicles = Record<string, string[]>;

export interface ResolvedVehicles {
  next?: string;
  vehicles: Vehicles;
  pilotURLs: URLObject;
}

export interface pageResult {
  results?: PageResults;
  next?: string;
}

export interface ResolvedPilots {
  pilots: Record<string, Omit<Pilot, "url">>;
  planetURLS: Record<string, null>;
}

export interface MaxPopulationVehicle {
  population: number;
  vehicleName: string;
  relatedPlanets: Planet[];
  relatedPilots: string[];
}

export type PopulateCurrentVehicle = (
  currentVehicleName: string,
  currentVehicle: string[],
  pilots: Record<string, Omit<Pilot, "url">>,
  planets: ResolvedPlanets
) => MaxPopulationVehicle;

export type CalculateSumOfPopulationPerVehicle = (
  vehicles: Vehicles,
  pilots: Record<string, Omit<Pilot, "url">>,
  planets: ResolvedPlanets
) => MaxPopulationVehicle;

export type InitMaxPopulationVehicleResult = (
  currentVehicleName?: string
) => MaxPopulationVehicle;

export type GetPlanets = (planetURLs: URLObject) => Promise<ResolvedPlanets>;

export type GetPilotsWithPlanets = (
  pilotURLs: URLObject
) => Promise<ResolvedPilots>;

export type GetPromisesFromURLsObject = (
  urlsObject: URLObject
) => Promise<any>[];

export type GetVehiclesWithPilotURLs = (
  resolvedVehicles: ResolvedVehicles
) => Promise<ResolvedVehicles>;
