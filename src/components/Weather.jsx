import React, { useState } from 'react'
import '../css/weather.css'
import Search from './Search'
import { getWeather } from "../api/weatherService";

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (searchCity) => {
        setCity(searchCity);
        setError('');
        try {
            const data = await getWeather(searchCity);
            setWeather(data);
        } catch (err) {
            setWeather(null);
            setError(err.message);
        }
    };

    return (
        <div>
            <div className='weather-container'>
                <div className='left-card'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', marginLeft: '30px' }}>
                        <span style={{ color: 'white', fontSize: '18px' }}>{weather ? new Date(weather.dt * 1000).toLocaleString('tr-TR') : ''}</span>
                        <span style={{ color: 'white', fontSize: '18px' }}>{weather ? weather.name : ''}</span>
                        <span style={{ color: 'white', fontSize: '18px' }}>{weather ? weather.sys.country : ''}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px', marginLeft: '30px' }}>
                        <span>
                            {weather ? (
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt="icon"
                                />
                            ) : ''}
                        </span>
                        <span style={{ color: 'white', fontSize: '50px', fontWeight: 'bold' }}>{weather ? Math.round(weather.main.temp) + '°C' : ''}</span>
                        <span style={{ color: 'white', fontSize: '20px' }}>{weather ? weather.weather[0].description : ''}</span>
                    </div>
                </div>
                <div className='right-card'>
                    <span>
                        <Search onSearch={handleSearch} />
                    </span>
                    <span>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        {weather && (
                            <div>
                                <div style={{ color: 'white', fontSize: '20px' }}>Nem: {weather.main.humidity}%</div>
                                <div style={{ color: 'white', fontSize: '20px' }}>Rüzgar: {Math.round(weather.wind.speed)} m/s</div>
                                <div style={{ color: 'white', fontSize: '20px' }}>Hissedilen Sıcaklık: {Math.round(weather.main.feels_like)}°C</div>
                            </div>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Weather