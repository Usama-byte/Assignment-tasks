import React from "react";
import Header from "./components/header/header";
import ProductListing from "./components/productListing/productListing";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <ProductListing />
      </div>
    </div>
  );
}

export default App;
