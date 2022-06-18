import "./style.css";
import { Props } from "./types";

const SidewaysTable = ({ data }: Props) => {
  return (
    <div className="sidewaysTableWrapper">

      <table className="sidewaysTable">
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default SidewaysTable;
