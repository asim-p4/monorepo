import "./App.css";
import Counter from "./components/Counter";
import { Documentation } from "./components/Documentation";

function App() {
  return (
    <>
      {/* Counter */}
      <Counter />

      <div className="ticks"></div>

      {/* DOCUMENTATION */}
      <Documentation />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
