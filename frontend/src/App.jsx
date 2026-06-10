import { useState } from "react";

function App() {

  const [input, setInput] = useState(`[
  {
    "paidBy": "Alice",
    "paidFor": {
      "Bob": 50,
      "Charlie": 50
    }
  }
]`);

  const [result, setResult] = useState("");

  const simplify = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/simplify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: input
        }
      );

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));

    } catch (err) {

      setResult(err.message);

    }
  };

  return (
    <div style={{
      width: "80%",
      margin: "auto",
      padding: "20px"
    }}>

      <h1>SplitWise Debt Simplifier</h1>

      <textarea
        rows="15"
        style={{
          width: "100%"
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={simplify}
      >
        Simplify Debts
      </button>

      <h2>Output</h2>

      <pre>
        {result}
      </pre>

    </div>
  );
}

export default App;
