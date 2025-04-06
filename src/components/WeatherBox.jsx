import React from 'react';

export const WeatherBox = ({ weather }) => {
    //console.log(weather);
    const temp = weather?.main?.temp;
    const fahrenheit = temp ? (temp * 9) / 5 + 32 : null; // temp가 있을 때만 화씨 계산

    return (
        <div className="weather-box">
            <h1>{weather?.name}</h1>
            <figure>
                {weather?.weather?.[0]?.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt={weather?.name}
                    />
                )}
            </figure>
            <h2>
                {temp !== undefined && temp !== null ? `${temp.toFixed(1)}°C` : '°C'} /{' '}
                {fahrenheit !== undefined && fahrenheit !== null ? `${fahrenheit.toFixed(1)}°F` : '°F'}
            </h2>
            <div>{weather?.weather?.[0]?.description || '날씨를 불러오는 중이에요...'}</div>
        </div>
    );
};
