import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Weather() {
    const [city,setCity]=useState("")
    const [weatherData,setweatherData]=useState(null);
    const keyapi="742373d36746ccf91a5fadb38b33ee65";
    const fetchData= async ()=>{
        try{
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyapi}`)
        setweatherData(response.data)
        console.log(response.data)

        }
        catch(error){
            console.log(error)

        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleChange=(e)=>{
        setCity(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetchData();
    }

    return(
        <div>
             <form onSubmit={handleSubmit}>
                <input onChange={handleChange}
                placeholder="city"
                value={city}/>
                <button>Submit</button>
               
            </form>
            {weatherData?(
                <>
                <div class="min-h-screen flex items-center justify-center">
                <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
						<div class="font-bold text-xl">{weatherData.name}</div>
						<div class="text-sm text-gray-500">{(new Date()).toLocaleString()}</div>
						<div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <svg class="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
						</div>
						<div class="flex flex-row items-center justify-center mt-6">
							<div class="font-medium text-6xl">{weatherData.main.temp}</div>
							<div class="flex flex-col items-center ml-6">
								<div>{weatherData.weather[0].description}</div>
								<div class="mt-1">
									<span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
									<span class="text-sm font-light text-gray-500">{weatherData.main.temp_max}°F</span>
								</div>
								<div>
									<span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
									<span class="text-sm font-light text-gray-500">{weatherData.main.temp_min}°F</span>
								</div>
							</div>
						</div>
						<div class="flex flex-row justify-between mt-6">
							<div class="flex flex-col items-center">
								<div class="font-medium text-sm">Wind</div>
								<div class="text-sm text-gray-500">{weatherData.wind.speed}k/h</div>
							</div>
							<div class="flex flex-col items-center">
								<div class="font-medium text-sm">Humidity</div>
								<div class="text-sm text-gray-500">68%</div>
							</div>
							<div class="flex flex-col items-center">
								<div class="font-medium text-sm">Visibility</div>
								<div class="text-sm text-gray-500">{weatherData.visibility}</div>
							</div>
						</div>
					</div>
                    </div>
                <h2>{weatherData.name}</h2>
                <p>Temperature:{weatherData.main.temp}</p>
                </>

            ):(
                <>
                <p>data fetching ....</p>
                </>
                
            )}
           

</div>
           
    )

    
}
