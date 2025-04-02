import React from 'react';

export const Weatherbutton = ({ cities, handleCityChange, isCelected }) => {
    return (
        <div className="weather-button">
            <button className={isCelected === '' ? 'button_selected' : ''} onClick={() => handleCityChange('Current')}>
                Current Location
            </button>
            {cities.map((item, index) => (
                <button
                    className={isCelected === item ? 'button_selected' : ''}
                    key={index}
                    onClick={() => handleCityChange(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};
