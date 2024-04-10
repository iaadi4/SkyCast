import { useEffect, useState } from "react"

function ForecastBox({data}) {

    const [time, setTime] = useState("")
    const [icon, setIcon] = useState(null)

    useEffect(() => {
        const spaceIndex = data.time.indexOf(" ");
        if (spaceIndex !== -1) {
            const extractedTime = data.time.substring(spaceIndex + 1);
            setTime(extractedTime);
        }
    }, [data]);

    return (
        <div className="flex flex-col bg-white/20 min-w-36 h-44 rounded-lg shadow-lg ml-4 mr-2 mb-8 justify-center items-center">
            <p className="text-white/90 text-md font-semibold">{time}</p>
            <img src={data.condition.icon} alt="Weather Icon" className="h-16 w-16 mt-1" />
            <p className="text-white text-lg font-bold">{data.temp_c}°</p>
        </div>
    )
}

export default ForecastBox