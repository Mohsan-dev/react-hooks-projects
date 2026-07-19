import { useEffect, useState } from "react";
import Search from "../search";


export default function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setloading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    async function fetchWeatherData(param) {
        try {
            setloading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&units=metric&appid=59cc0cceb8447b35efa8d2a6dab2d6e9`)
            const data = await response.json()

            if (data.cod === 200) {
                setWeatherData(data)
            } else {
                setWeatherData(null)
                
            }
            setloading(false)
        }

        catch (e) {
            setloading(false)
            
        }
    }


    function handleSearch() {
        fetchWeatherData(search)
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    useEffect(() => {
        fetchWeatherData("Islamabad")
    }, [])
    console.log(weatherData)
    return <div>
        <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch} />
        {
            loading ? (
                <div className="loading">Loading...</div>
            ) : weatherData ? (
                <div>
                    <div className="city-name">
                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                    </div>
                    <div className="data">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div>{weatherData?.name}</div>
                    <div className="temp">{weatherData?.main?.temp}°C</div>
                    <p className="desctiption">{weatherData?.weather?.[0]?.description}</p>
                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                            <div className="column">
                                <div>
                                    <p className="Humidity">{weatherData?.main?.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-data">No weather data found. Try another city.</div>
            )
        }
    </div>
}