import Weather from './components/Weather'

const OneCountry = ({country, show}) => {
    if (show) {
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map((lang,i) => 
                    <li key={i}>
                        {lang}
                    </li>
                    )}
                </ul>
                <img src={country.flags.png}/>
                <h2>Weather in {country.capital[0]}</h2>
                <Weather city={country.capital[0]} />
            </>
        )
    }
    else {
        return (<></>)
    }
    
}

export default OneCountry