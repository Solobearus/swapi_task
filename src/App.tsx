import './App.css';
import VehicleTableData from './components/VehicleTableData';
import PlanetsBarChart from "./components/PlanetsBarChart";

const App = () => {
  return (
    <div className="app">
      <div className="contentWrapper">
        <VehicleTableData />
        <PlanetsBarChart />
      </div>
    </div>
  );
}

export default App;





