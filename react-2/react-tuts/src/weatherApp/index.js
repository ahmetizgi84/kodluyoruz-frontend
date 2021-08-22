import React, { useContext } from "react";
import Card from "./components/Card";
import DataContext from "./context/DataContext";

function Weather() {
  const { cities, data, setCoords } = useContext(DataContext);

  const handleChange = (value) => {
    let coordinates = value.split(",");
    setCoords(coordinates);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mx-auto py-3" style={{ backgroundColor: "#f6fafd" }}>
          <div className="col-lg-3">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleChange(e.target.value)}
            >
              <option defaultValue value="37.00,35.21">
                ADANA
              </option>
              {cities.map((city, i) => (
                <option key={i} value={city.coordinates}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        {data && data.map((day, i) => <Card key={i} day={day} keyIndex={i} />)}
      </div>
    </div>
  );
}

export default Weather;
