import React, { useState } from "react";
import QueryGifts from "./QueryGIfts";

export default function GiftExpertApp() {
  const [value, setvalue] = useState("");
  const [string, setstring] = useState("");

  const handleChangeValue = (e) => {
    setvalue(e.target.value);
  };

  const handleSetString = () => {
    setstring(value);
  };

  return (
    <div className="container">
      <h1>Buscador De Gifts</h1>
      <h2>consumiendo la API de Giphy</h2>
      <div className="grid-inpubutton">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setstring(value);
          }}
        >
          <input
            className="input"
            type={"text"}
            value={value}
            onChange={handleChangeValue}
            placeholder="Busca Un Gift"
          ></input>
        </form>

        <button onClick={handleSetString} className="button">
          <img src="./search-outline.svg" />
        </button>
      </div>
      <QueryGifts category={string} />
    </div>
  );
}
