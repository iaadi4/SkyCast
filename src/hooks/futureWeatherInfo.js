import { useEffect, useState } from "react";

function useFutureWeatherInfo(city) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=31e90641af09458c9ed72949240604&q=${city}&days=1&aqi=no&alerts=no`)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((e) => console.log(e))
    }, [city])
    return data
}

export default useFutureWeatherInfo