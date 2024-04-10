import { useEffect, useState } from "react";


function useWeatherInfo(city) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=31e90641af09458c9ed72949240604&q=${city}&aqi=yes`)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((e) => console.log(e))
    }, [city])
    return data
}

export default useWeatherInfo