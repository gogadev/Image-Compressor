import React from "react";

import Header from "./components/header/Header";
import ImgCompressor from "./components/img-compressor/ImgCompressor";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <ImgCompressor />
    </div>
  );
};

export default App;
