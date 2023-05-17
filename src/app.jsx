import { fakeData } from "./fakeData";
import ReactTerminalHistory from "../lib/index.jsx";
// import ReactTerminalHistory from "react-terminal-history";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen p-20">
        <ReactTerminalHistory data={fakeData} title="Logs" />
      </div>
    </>
  );
}

export default App;
