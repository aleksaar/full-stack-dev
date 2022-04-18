import { useState, useEffect } from 'react'
import OneCountry from "../OneCountry"


const ShowCountries = ({countries}) => {
    const [showBools, setShowBools] = useState([])

    
    const clickHandler = (i) => {
        const newBools = [...showBools]
        newBools[i] = !newBools[i]
        setShowBools(newBools)
    }

    const hook = () => {
        setShowBools(new Array(countries.length).fill(false))
        //console.log("hook")
    }
    useEffect(hook, [countries])

    if (countries.length <= 10 && countries.length > 1) {
        return (
            <>
            <ul>
                {countries.map((country, i) => 
                <div key={country.name.common}>
                <li >
                    {country.name.common} 
                    <button onClick={() => clickHandler(i)}>
                        show
                    </button>
                </li>
                <OneCountry country={country} show={showBools[i]} />
                </div>
                )}
            </ul>
            </>
        )
    }
    else if (countries.length == 1) {
        return (
            <>
                <OneCountry country={countries[0]} show={true}/>
            </>
        )
    }
    else {
        return (
            <>
                Too many matches, specify
            </>
        )
    }
}

export default ShowCountries
