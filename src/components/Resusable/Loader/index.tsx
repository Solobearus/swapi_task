import "./style.css";
import { SpinnerInfinity } from 'spinners-react';

const SidewaysTable = () => {
  return (
    <div className="loader">
      <SpinnerInfinity size={100} thickness={100} speed={100} color="rgba(255, 232, 31, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
    </div>
  );
};

export default SidewaysTable;
