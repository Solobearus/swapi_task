import "./style.css";
import { Props } from "./types";

const SidewaysTable = ({ data }: Props) => {
  return (
    <table className="sidewaysTable">
      <tbody>
        {Object.keys(data).map((key) => (
          <tr>
            <td>{key}</td>
            <td>{data[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SidewaysTable;
