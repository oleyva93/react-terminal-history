import { useEffect, useState } from "react";
import ReactTerminalHistory from "../lib/index.js";
import "./index.css";

/**
 * Custom hook to load data from https://www.ag-grid.com/example-assets/olympic-winners.json
 * and format it for display.
 *
 * @returns {Object} An object containing the loaded data and a loading flag.
 */
const useLoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((res) => res.json())
      .then((data) => {
        // clone some data to make it bigger and test the virtualization
        const dataFake = [
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
        ];
        setData(
          dataFake.map(
            (item) =>
              `${item.athlete}, Age: ${item.age}, Country: ${item.country}, Year: ${item.year} - ${item.date}`
          )
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { data, loading };
};

function App() {
  const { data, loading } = useLoadData([]);

  return (
    <div
      className="background-pattern flex gap-4 justify-center items-center h-screen p-20 pattern-cross pattern-red-500 pattern-bg-white 
  pattern-size-6 pattern-opacity-10"
    >
      <ReactTerminalHistory
        loading={loading}
        data={data}
        title="Logs"
      />
    </div>
  );
}

export default App;
