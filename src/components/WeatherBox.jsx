import React from 'react';

export const WeatherBox = ({ weather }) => {
    //console.log(weather);
    const temp = weather?.main.temp;
    const fahrenheit = (temp * 9) / 5 + 32;
    return (
        <div className="weather-box">
            <h1>{weather?.name}</h1>
            <figure>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.name} />
            </figure>
            <h2>
                {temp?.toFixed(1)}°C / {fahrenheit?.toFixed(1)}°F
            </h2>
            <div>{weather?.weather[0].description}</div>
        </div>
    );
};
