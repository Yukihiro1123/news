import React from "react";

import { BrowserRouter } from "react-router-dom";
//compoents
import Navbar from "./components/Navbar/Navbar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
