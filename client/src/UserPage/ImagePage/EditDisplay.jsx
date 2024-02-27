import {useState, useEffect}from 'react';
import { Modal, Box, Grid, Paper, Button, TextField} from '@mui/material';
import { Country, State, City } from 'country-state-city';
import EditFormSelects from "./EditUploadForm"




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ open, onClose, imagePostData, updateImagePostData}) => {
    const [countryIso, setCountryIso] = useState(imagePostData.countryIso);
    const [stateIso, setStateIso] = useState(imagePostData.stateIso);
    const [city, setCity] = useState(imagePostData.city);

    const [description, setDescription] = useState(imagePostData.description);

    useEffect(()=> {
      setCountryIso(imagePostData.countryIso);
      setStateIso(imagePostData.stateIso);
      setCity(imagePostData.city);
      setDescription(imagePostData.description)
    },[imagePostData])



    console.log(imagePostData);
    const countryInfo = Country.getCountryByCode(imagePostData.countryIso)
    const stateInfo = State.getStateByCodeAndCountry(imagePostData.stateIso, imagePostData.countryIso);
    const cityName = imagePostData.city;

    const handleCancel = () => {
        setCountryIso(imagePostData.countryIso);
        setStateIso(imagePostData.stateIso);
        setCity(imagePostData.city);
        setDescription(imagePostData.description);
        onClose();
    }

    const findCityLocation = (cityName, stateIso, countryIso) => {
      const cityDataBase = City.getCitiesOfState(countryIso, stateIso)

      for (let i = 0; i < cityDataBase.length; i++) {
          if (cityDataBase[i].name.toLowerCase() === cityName.toLowerCase()) {
              return [cityDataBase[i].latitude, cityDataBase[i].longitude];
          }
      }
      return ["",""];

  }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
      
  };

  const handleSubmit = () =>{
    const formData = {
      imageUrl: imagePostData.imageUrl,
      userId: imagePostData.userId,
      countryIso: countryIso,
      stateIso: stateIso,
      city: city,
      latitude: "",
      longitude: "",
      description: description
  };
  if (stateIso === '') {
    const countryInfo = Country.getCountryByCode(countryIso)
    formData.latitude = countryInfo.latitude;
    formData.longitude = countryInfo.longitude;
}else if (city === ''){
    const countryStateData = State.getStateByCodeAndCountry(stateIso, countryIso);
    formData.latitude = countryStateData.latitude;
    formData.longitude = countryStateData.longitude;
}else{
    const cityData = findCityLocation(city,stateIso,countryIso);
    formData.latitude = cityData[0];
    formData.longitude = cityData[1];
}

updateImagePostData(formData);
onClose();

    

  }


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <Box sx={style}>
        <img src={imagePostData.imageUrl} style={{ maxWidth: '100%' }} />
        <EditFormSelects 
        open={open} 
        countryIso={countryIso} 
        stateIso={stateIso} 
        city={city} 
        setCountryIso={(value) => setCountryIso(value)} 
        setStateIso={(value) => setStateIso(value)} 
        setCity = {(values) => setCity(values)}
        />
    <Paper style={{ padding: 16 }}>
    <TextField
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                onChange={handleDescriptionChange}
            />
        </Paper>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Button fullWidth variant="outlined" onClick={()=>handleCancel()}>Cancel</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button fullWidth variant="outlined" onClick={()=>handleSubmit()}>Confirm Edit</Button>
        </Grid>
      </Grid>
      </Box>
    </Modal>
  );
};

export default EditModal;
