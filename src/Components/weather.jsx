import React from 'react'
import './weather.css'
import Form from 'react-bootstrap/Form';
import { FaSistrix } from "react-icons/fa";
import Clock from 'react-live-clock';
import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKeys from '../apiKeys';
import ReactAnimatedWeather from 'react-animated-weather';


// import atmosphere from './Images/atmosphere.jpg'
// import sunny from './Images/sunny.jpg'
// import thunderstorm from './Images/thunderstorm.jpg'

import clear from './Images/clear.jpg'
import clouds from './Images/clouds.jpg'
import defaultImg from './Images/defaultImg.jpg'
import drizzle from './Images/drizzlee.jpg'
import fog from './Images/fog.jpg'
import rain from './Images/rain.jpg'
import snow from './Images/snow.jpg'
import haze from './Images/haze.jpg'
import wind from './Images/wind.jpg'
import mist from './Images/mist.jpg'
import tornedo from './Images/default.jpg'




const Weather = () => {

    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});
    const [weatherIcon, setWeatherIcon] = useState("CLEAR_DAY");
    const [background, setBackground] = useState(defaultImg);


    useEffect(()=>{
        search("Kolkata");
    },[]);

    const search = (city)=>{
        axios
        .get(
          `${apiKeys.base}weather?q=${
            city !== "[object Object]" ? city : query
          }&units=metric&APPID=${apiKeys.key}`
        )
        .then((response)=>{
                setWeather(response.data);
                console.log(response);
                setQuery(" ");
        })
        .catch(function (error){
            console.log(error);
            setWeather("");
            setQuery("");
            setError({message: "Not found", query:query});
        })
        
    }

    const searchLocation = (e)=>{
            if(e.key==='Enter')
            {
                search(query);
            }
        }
        
        const searchLocationByClick = ()=>{
            search(query);

        }      

    const handleClick = () =>{
        const inputElement = document.querySelector('.search_bar');
        inputElement.style.backgroundColor = 'rgba(100, 101, 107, 0.594)';
        inputElement.style.backdropFilter = 'blur(3px)';         
        inputElement.style.color = 'white';
    }

    // if (Object.keys(weather).length === 0) {
    //     return <div>Loading...</div>;
    //   }

   
    useEffect(() => {
        if (typeof weather.main !== "undefined") {

          switch (weather.weather[0].main) {
            case "Haze":
              setWeatherIcon("CLEAR_DAY");
              setBackground(haze);

              break;
            case "Clouds":
              setWeatherIcon("CLOUDY");
              setBackground(clouds);

              break;
            case "Rain":
              setWeatherIcon("RAIN");
              setBackground(rain);

              break;
            case "Snow":
              setWeatherIcon("SNOW");
              setBackground(snow);

              break;
            case "Dust":
              setWeatherIcon("WIND");
              setBackground(wind);

              break;
            case "Drizzle":
              setWeatherIcon("SLEET");
              setBackground(drizzle);

              break;
            case "Fog":
              setWeatherIcon("FOG");
              setBackground(fog);

              break;
            case "Mist":
                setWeatherIcon("FOG");
                setBackground(mist);

                break;
            case "Smoke":
              setWeatherIcon("FOG");
              setBackground(mist);

              break;
            case "Tornado":
              setWeatherIcon("WIND");
              setBackground(tornedo);
              break;
            case "Clear":
              setWeatherIcon("CLEAR_DAY");
              setBackground(clear);
          }
        }
      }, [weather]);

      const dateBuilder = (d) => {
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
      
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
      
        return `${day}, ${date} ${month} ${year}`;
      };


    


  return (
      <div className='container' style={{backgroundImage: `url(${background})` }}>
                        <div className='display' >
                                {typeof weather.main !== "undefined" ?(
                                        <>
                                            <div className="main_info">
                                                <div className='tem'>{Math.round((weather.main.temp))}&deg;C</div>

                                                <div className='location_info'>
                                                    <div className='location_name'>{weather.name}</div>
                                                    <div className='date-time'>{dateBuilder(new Date())}</div>
                                                </div>

                                                <div className='atmosphere_info'>
                                                    <div className='atm-icon'>{<ReactAnimatedWeather icon= {weatherIcon} color="white" className='atm-icon-symb'/>}</div>
                                                    <div className='atm-condition'>{weather.weather[0].main}</div>
                                                
                                                </div>
                                            </div>

                                            <div className="current-time">
                                                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                                            </div> 
                                     </>       
                                    ):(
                                    <li>
                                    {error.query} {error.message}
                                    </li>
                                )}
                        </div>
                    <div className='search_section'>
                            <Form className="d-flex">
                                    <Form.Control type="search" placeholder="City" className="me-2 search_bar" aria-label="Search"  onClick={handleClick} value={query} onChange={(e)=>setQuery(e.target.value)}  onKeyDown={(e)=>searchLocation(e)} />
                                    <div  className='search_button' onClick={searchLocationByClick}> <FaSistrix/> </div>
                            </Form>
                            <div className="search_info">
                                <div className="search_info_heading">Weather Details</div>
                                {typeof weather.main !== "undefined" ? (
                                    <div className="search_info_content">
                                    <div>Cloudy <p className='value'>{weather.clouds.all}%</p></div>
                                    <div>Humidity <p className='value'>{weather.main.humidity}%</p></div>
                                    <div>Wind <p className='value'>{weather.wind.speed} km/h</p></div>
                                    <div>Pressure <p className='value'>{weather.main.pressure} hPa</p></div>
                                </div>
                                ) : (
                                    <li style={{color:'white', fontSize:'20px', paddingTop:'20px'}}>
                                    {error.query} {error.message}
                                    </li>
                                )}
                                
                            </div>
                    </div> 
        
    </div>
  )
}

export default Weather;