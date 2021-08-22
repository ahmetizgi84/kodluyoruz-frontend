import React from "react";

import { DataProvider } from "./context/DataContext";
import WeatherApp from "./index";

function Wrapper() {
  return (
    <DataProvider>
      <WeatherApp />
    </DataProvider>
  );
}

export default Wrapper;
