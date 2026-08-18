const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>Hello</h1>

      <div>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment (+)</button>
        <button onClick={() => setCount(count - 1)}>Decrement (-)</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

// const h2 = document.createElement("h2");
// h2.textContent = "Greetings";
// document.getElementById("root").append(h2);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
