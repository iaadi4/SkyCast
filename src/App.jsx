import { useEffect, useState } from 'react'
import useWeatherInfo from './hooks/WeatherInfo'
import backgroundImage from './assets/Mountains2.jpg'
import useFutureWeatherInfo from './hooks/futureWeatherInfo.js'
import ForecastBox from './components/forecasts.jsx'
import { IoSearchOutline } from "react-icons/io5";

function App() {

  const [check, setCheck] = useState("New Delhi")
  const [city, setCity] = useState("") 
  const [country, setCountry] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [tempreture, setTempreture] = useState("")
  const [condition, setCondition] = useState("")
  const [icon, setIcon] = useState(null)
  const [wind, setWind] = useState("")
  const [maxTemp, setMaxTemp] = useState("")
  const [minTemp, setMinTemp] = useState("")
  const [sunrise, setSunrise] = useState("")
  const [sunset, setSunset] = useState("")
  const [cloud, setcloud] = useState("")
  
  const weatherInfo = useWeatherInfo(check)
  const futureInfo = useFutureWeatherInfo(check)

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long',day: 'numeric', month: 'long'};
    setCurrentDateTime(date.toLocaleDateString('en-IN', options));
  }, []);

  useEffect(() => {
    if(weatherInfo.location) {
      setCity(weatherInfo.location.name)
      setCountry(weatherInfo.location.country)
      setTempreture(weatherInfo.current.temp_c)
      setCondition(weatherInfo.current.condition.text)
      setIcon(weatherInfo.current.condition.icon)
      setWind(weatherInfo.current.wind_kph)
      setcloud(weatherInfo.current.cloud)
    }
  }, [check, weatherInfo])

  useEffect(() => {
    if(futureInfo.location) {
      setMaxTemp(futureInfo.forecast.forecastday[0].day.maxtemp_c)
      setMinTemp(futureInfo.forecast.forecastday[0].day.mintemp_c)
      setSunrise(futureInfo.forecast.forecastday[0].astro.sunrise)
      setSunset(futureInfo.forecast.forecastday[0].astro.sunset)
    }
  }, [check, futureInfo])

  return (
    <div 
      className="h-screen flex flex-col overflow-x-auto"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize:  `cover`
      }}>
      
      <div className=' basis-[12%]'>
        <h1 className='text-lg m-3 text-white/60'>WEATHER APP</h1>
      </div>

      <div className='flex mb-10'>
        <div className='flex basis-full'>
          <input 
            onKeyDown={(e) => {
              if(e.key == 'Enter')
                setCheck(e.target.value)
            }}
            type='text'
            placeholder={city}
            className='w-1/3 p-2 pl-10 rounded-3xl outline-none mx-auto shadow-lg'
          >
          </input>
          <IoSearchOutline  className='absolute left-[34.4%] sm:top-[12%] top-[13.3%] text-gray-400'/>
        </div>
      </div>

      <div className='mt-8 sm:mt-0'>
        <h1 className='text-white text-4xl px-5 font-[Roboto]'>{city}, {country}</h1>
        <p className='text-white/80 px-5 text-xl'>{currentDateTime}</p>
      </div>

      <div className='flex flex-row h-[30%] mt-10 pt-4 sm:pt-0 '>
        <div className='flex flex-row basis-1/2 items-center'>
          <div id='weather-icon' className='flex flex-row basis-1/2 justify-end'>
            {icon && <img src={icon} alt="Weather Icon" className=" h-24 w-24 md:h-32 md:w-32" />}
          </div>
          <div className='basis-1/2'>
            <p className='text-white text-5xl md:text-6xl'>{tempreture}°</p>
            <p className='text-white mt-2 text-lg'>{condition}</p>
          </div>
        </div>

        <div className='flex flex-col basis-1/2 bg-white/20 rounded-lg mr-5 shadow-lg'>
          <div className='flex flex-row basis-1/2 justify-evenly'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-white md:text-xl font-semibold'>{maxTemp}°</p>
              <p className='text-white'>High</p>
            </div>
            <div className='flex flex-col justify-center items-center font-semibold'>
              <p className='text-white md:text-xl '>{wind}kph</p>
              <p className='text-white'>Wind</p>
            </div>
            <div className='flex flex-col justify-center items-center font-semibold'>
              <p className='text-white  md:text-xl'>{sunrise}</p>
              <p className='text-white'>Sunrise</p>
            </div>
          </div>
          
          <div className='flex flex-row basis-1/2 justify-evenly'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-white md:text-xl font-semibold'>{minTemp}°</p>
              <p className='text-white'>Low</p>
            </div>
            <div className='flex flex-col justify-center items-center font-semibold'>
              <p className='text-white text-lg md:text-xl '>{cloud}%</p>
              <p className='text-white'>Cloud</p>
            </div>
            <div className='flex flex-col justify-center items-center font-semibold'>
              <p className='text-white md:text-xl'>{sunset}</p>
              <p className='text-white'>Sunset</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col pt-4 sm:pt-0 mt-10 sm:mt-0'>
        <div className='flex basis-1/12'>
          <h1 className='text-white/90 text-xl px-5'>FORECAST</h1>
        </div>
        <div className='flex flex-row mt-4 justify-evenly overflow-y-auto'>
          {futureInfo.forecast && futureInfo.forecast.forecastday[0].hour.map((hourData, index) => (
            <ForecastBox key={index} data={hourData} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default App
