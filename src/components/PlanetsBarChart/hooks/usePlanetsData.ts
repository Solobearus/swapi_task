import { useEffect, useState } from "react";
import { CHART_PLANETS } from "../../../utils/consts";
import { apiHelper } from "../../../utils/apiHelper";
import { GetPlanetsResults } from "../types";
import { ChartData } from "../../Resusable/BarChart/types";

const usePlanetsData = () => {
  const [planetsChartData, setPlanetsChartData] = useState<null | ChartData[]>(
    null
  );

  useEffect(() => {
    getChartPlanets();
  }, []);

  const getChartPlanets = async () => {
    const results: GetPlanetsResults[] = await Promise.all(
      CHART_PLANETS.map((planetName) =>
        apiHelper(`https://swapi.py4e.com/api/planets/?search=${planetName}`)
      )
    );

    const formattedResults = results.map((result) => {
      const { name, population } = result.results[0];
      return {
        name,
        amount: Number(population),
      };
    });
    setPlanetsChartData(formattedResults);
  };

  return { planetsChartData };
};

export default usePlanetsData;
