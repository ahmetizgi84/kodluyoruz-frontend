import { createContext, useEffect, useState } from "react";
import { cities } from "../cities";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [coords, setCoords] = useState(["37.00", "35.32"]);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoords([position.coords.latitude, position.coords.longitude]);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        setCoords(["37.00", "35.32"]); // Kullanıcı konum kullanımına izin vermezse default koordinatlar
      }
    );
  }, []);

  useEffect(() => {
    let URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=metric&lang=tr&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}`;
    fetch(URL)
      .then((res) => res.json())
      .then((resp) => {
        setData(resp.daily);
      });
  }, [coords]);

  const values = {
    cities,
    coords,
    data,
    setCoords,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}

export default DataContext;
