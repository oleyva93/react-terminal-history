import { fakeData } from "./fake-data";
import ReactTerminalHistory from "../lib/index.js";
import "./index.css";

function App() {
  return (
    <div
      className="background-pattern flex gap-4 justify-center items-center h-screen p-20 pattern-cross pattern-red-500 pattern-bg-white 
  pattern-size-6 pattern-opacity-10"
    >
      <ReactTerminalHistory data={fakeData} title="Logs" />
      <ReactTerminalHistory data={fakeData} title="Logs" />
    </div>
  );
}

export default App;
