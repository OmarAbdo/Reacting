import useCounterStore from "../store";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(0);
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home page component.</p>
      <div>
        <h2>Counter with zustand: {count}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <div>
        <h2>Counter with useState: {value}</h2>
        <button onClick={() => setValue(value + 1)}>Increment</button>
        <button onClick={() => setValue(value - 1)}>Decrement</button>
      </div>
    </div>
  );
}
