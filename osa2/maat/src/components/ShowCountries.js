import { useState } from 'react'
import OneCountry from "../OneCountry"




const ShowCountries = ({countries}) => {

    const clickHandler = (country) => {
        console.log(country.name.common)
    }


    if (countries.length <= 10 && countries.length > 1) {

        return (
            <>
            <ul>
                {countries.map(country => 
                <li key={country.name.common}>
                    {country.name.common} 
                    
                </li>
                )}
            </ul>
            </>
        )
    }
    else if (countries.length == 1) {
        console.log(countries[0])             
        return (
            <>
                <OneCountry country={countries[0]} />
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
