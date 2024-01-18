import { useState, useEffect } from 'react';
import { FormControl,FormHelperText, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Country, State, City } from 'country-state-city';
const countryData = Country.getAllCountries();


const EditFormSelects = ({open, countryIso="", stateIso="", city="", setCountryIso, setStateIso, setCity}) => {
    

    
    const countries = countryData.map((country) => ({name: country.name, isoCode: country.isoCode}));
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);



    // Replace these with your actual data
    const handleCountryChange = (event) => {
        setCountryIso(event.target.value);
        const stateData = State.getStatesOfCountry(event.target.value);
        const stateArray = stateData.map((state)=>({name: state.name, isoCode: state.isoCode}))
        setStates(stateArray);
        setStateIso('');
        setCity('');
    };
    
    const handleStateChange = (event) => {
        setStateIso(event.target.value);
        const cityData = City.getCitiesOfState(countryIso, event.target.value);
        const cityArray = cityData.map((city) => ({name: city.name}))
        setCities(cityArray);
        setCity('');
    };
    
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    useEffect(() => {
    const initiateData = () => {
        setCountryIso(countryIso);
        const stateData = State.getStatesOfCountry(countryIso);
        const stateArray = stateData.map((state)=>({name: state.name, isoCode: state.isoCode}))
        setStates(stateArray);
        setStateIso(stateIso);
        const cityData = City.getCitiesOfState(countryIso, stateIso);
        const cityArray = cityData.map((city) => ({name: city.name}))
        setCities(cityArray);
    
    };
    initiateData()},[open]
    )
    

  

    // ... (rest of your state and handler functions)

    return (
        <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth >
                    <InputLabel>Country</InputLabel>
                    <Select value={countryIso} label="Country" onChange={handleCountryChange}>
                        {countries.map((country, index) => (
                            <MenuItem key={index} value={country.isoCode}>{country.name}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Note: Location Guessing is not provided in Edit form</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
                <FormControl fullWidth disabled={countryIso === ""}>
                    <InputLabel>State</InputLabel>
                    <Select value={stateIso} label="State" onChange={handleStateChange}>
                    <MenuItem value={""}>*Undetermined*</MenuItem>
                        {states.map((state, index) => (
                            <MenuItem key={index} value={state.isoCode}>{state.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
                <FormControl fullWidth disabled = {stateIso === ""}>
                    <InputLabel>City</InputLabel>
                    <Select value={city} label="City" onChange={handleCityChange}>
                    <MenuItem value={""}>*Undetermined*</MenuItem>
                        {cities.map((city, index) => (
                            <MenuItem key={index} value={city.name}>{city.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default EditFormSelects;
