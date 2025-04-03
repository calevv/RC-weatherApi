import { useEffect, useState } from 'react';
import './App.css';
import { WeatherBox } from './components/WeatherBox';
import { Weatherbutton } from './components/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

// 1. 앱이 실행되자마자 현재 위치기밙 날씨가 보인다.
// 2. 날씨정보에는 도씨, 섭씨, 화씨 날씨 상태
// 3. 5개의 버튼(현재위치와 다른 도시 4개)
// 4. 도시버튼을 선택할 때마다 도시 별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 현재 위치 기준 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const cities = ['London', 'Paris', 'Hawaii', 'Canberra'];
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCurrentLocation(lat, lon);
        });
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        try {
            setLoading(true);
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=kr`;
            let response = await fetch(url);
            let data = await response.json();
            //console.log(data);
            setWeather(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const changeWeatherByCityName = async () => {
        try {
            setLoading(true);
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=kr`;
            let response = await fetch(url);
            let data = await response.json();
            console.log('change', data);
            setWeather(data);

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCityChange = (city) => {
        if (city === 'Current') {
            setCity('');
        } else {
            setCity(city);
        }
    };
    useEffect(() => {
        if (city === '') {
            getCurrentLocation();
        } else {
            changeWeatherByCityName();
        }
    }, [city]);

    return (
        <div>
            {loading ? (
                <div className="container">
                    <ClipLoader
                        color="#BB58E7"
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="loadingSpinner"
                    />
                </div>
            ) : (
                <div className="container">
                    <WeatherBox weather={weather} />
                    <Weatherbutton cities={cities} handleCityChange={handleCityChange} isCelected={city} />
                </div>
            )}
        </div>
    );
}

export default App;
