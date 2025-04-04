import React, { useState, useEffect } from 'react';

export const WeatherBox = ({ weather }) => {
    const [cityname, setCityname] = useState('');
    const [loading, setLoading] = useState(true);
    let { lat, lon } = weather.coord;

    const getLocationName = async (lat, lon) => {
        setLoading(true);
        try {
            let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=ko-kr&lat=${lat}&lon=${lon}`;
            let response = await fetch(url);
            let data = await response.json();
            let address = data.address;
            console.log(address);
            setCityname(address);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocationName(lat, lon);
    }, [lat, lon]);

    const temp = weather?.main.temp;
    const fahrenheit = (temp * 9) / 5 + 32;

    return (
        <div className="weather-box">
            {loading ? <div className="loading-spinner">Loading...</div> : <h1>{cityname?.city}</h1>}
            <figure>
                {weather?.weather[0].icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt={weather?.name}
                    />
                )}
            </figure>
            <h2>
                {temp?.toFixed(1)}°C / {fahrenheit?.toFixed(1)}°F
            </h2>
            <div>{weather?.weather[0].description}</div>
        </div>
    );
};
