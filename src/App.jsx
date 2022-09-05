import { useState, useEffect } from 'react'
import { prettyPrintJson } from 'pretty-print-json';
import './App.css'

const API_CREDENTIALS = '' // TODO fille out secret here!

function App() {
  const [countries, updateCountries] = useState()
  const [country, updateCountry] = useState()
  const [countryCode, setCountryCode] = useState(229)

  // fetch all countries
  useEffect(() => {
    const getCountries = async () => {
      const resp = await fetch('https://api.footprintnetwork.org/v1/countries', {
        method: 'GET',
        headers: {
          Authorization: API_CREDENTIALS,
        },
      })
  
      const json = await resp.json()
      updateCountries(json)
    }
    getCountries()
  }, [])   
  
  // fetch a single country by countryCode
  useEffect(() => {
    const getcountry = async () => {
      const resp = await fetch(`https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`, {
        method: 'GET',
        headers: {
          Authorization: API_CREDENTIALS,
        },
      })
  
      const json = await resp.json()
      updateCountry(json)
    }
    getcountry()
  }, [countryCode])   


  // log out api responses for convenience
  console.log('countries', countries)
  console.log('country', country)  

  return (
    <div className="App">
      <h1 >Welcome to Altruistiq!</h1>
      { countries && country &&
        <div>
          <p>{countries?.length} countries loaded</p>

      
          <div className="flex">
            <div className="card flex-column">
              <h3>Example countries JSON (first 5 results)</h3> 
              <pre>{JSON.stringify(countries?.slice(0, 5), null, 2)}</pre>
            </div>        
            <div className="card flex-column">
              <h3>Example country JSON (first 5 years)</h3> 
              <pre>{JSON.stringify(country?.slice(0, 5), null, 2)}</pre>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default App
