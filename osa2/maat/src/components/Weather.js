import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    
    const [temp, setTemp] = useState(null)
    const [wind, setWind] = useState(null)
    const [icon, setIcon] = useState(null)


    const hook = () => {
        axios
            .get(url)
            .then(response => {
                setTemp(response.data.main.temp - 273.15)
                setWind(response.data.wind.speed)
                setIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
            })
    }
    useEffect(hook, [])

    return (
        <div>
            <p>Temperature {temp} Celsius</p>
            <p>Wind {wind} m/s</p>
            <img src={icon} />
        </div>
    )
}

export default Weather