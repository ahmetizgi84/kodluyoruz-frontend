import React from "react";

function Card({ day, keyIndex }) {
  const img = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

  const timeStampFormatter = (timestamp) => {
    var a = new Date(timestamp * 1000);
    var days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    var dayOfWeek = days[a.getDay()];
    return dayOfWeek;
  };

  return (
    <div className={`col-lg-1 mx-2 border ${keyIndex === 0 && "currentDay"}`}>
      <div className="text-center">{timeStampFormatter(day.dt)}</div>
      <div>
        <img src={img} alt={day.weather[0].description} className="img-fluid img-responsive" />
      </div>
      <div className="text-center">
        {Math.round(day.temp.max, 0)}-{Math.round(day.temp.min, 0)} ℃
      </div>
      <div className="text-center">{day.weather[0].description}</div>
    </div>
  );
}

export default Card;
