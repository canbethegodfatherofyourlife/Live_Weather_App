import React,{useState, useEffect} from "react";
import "./style.css";

const Temp = () => {

    const [searchValue,setSearch] = useState('kolkata')
    
    const [weatherState, setWeatheState] = useState("");

    const [tempInfo,setTempInfo] = useState({})
    const getWeatherInfo = async() => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5ed619fcc5199a227b218ba8b9afa633`
            let res = await fetch(url)
            let data = await res.json()
            const {temp,humidity,pressure} = data.main
            const {main: weathermood} = data.weather[0]
            const {name} = data 
            const {speed} = data.wind 
            const {country,sunset} = data.sys  
            let sec = sunset;
            let date = new Date(sec * 1000);
            let timeStr = `${date.getHours()}:${date.getMinutes()}`;
            const myNewWeather = {
                temp,humidity,pressure,weathermood,name,speed,country,timeStr
            } 
            setTempInfo(myNewWeather)
        }catch(err){
            console.log(err);
        }
    }

    useEffect( () =>{
         getWeatherInfo()
    },[searchValue])

    useEffect(() => {
        if (tempInfo.weathermood) {
          switch (tempInfo.weathermood) {
            case "Clouds":
              setWeatheState("wi-day-cloudy");
              break;
            case "Haze":
              setWeatheState("wi-fog");
              break;
            case "Clear":
              setWeatheState("wi-day-sunny");
              break;
            case "Mist":
              setWeatheState("wi-dust");
              break;
    
            default:
              setWeatheState("wi-day-sunny");
              break;
          }
        }
      }, [tempInfo.weathermood]);
  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=> setSearch(e.target.value)}
            autofocus
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{tempInfo.temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{tempInfo.weathermood}</div>
            <div className="place">{tempInfo.name}, {tempInfo.country}</div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.timeStr} <br /> Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.humidity} <br /> Humidity
              </p>
            </div>
          </div>
          <div className="weather-extra-info">
          <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.pressure} <br /> Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.speed} <br /> Speed 
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Temp;
