import { useState } from 'react';
import { Button, TextField, Typography, Box, Collapse, Alert, IconButton, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import FormSelects from './UploadForm';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';


const UploadForm = () => {
    const history = useNavigate();
    const countryDataBase = Country.getAllCountries();




    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [description, setDescription] = useState('');
    const [countryIso, setCountryIso] = useState('');
    const [stateIso, setStateIso] = useState('');
    const [city, setCity] = useState('');
    const [dataValid, setDataValidity] = useState(false);
    const [warningText, setWarningText] = useState("") 

    const findCountryIso = (countryName) => {
        for (let i = 0; i < countryDataBase.length; i++) {
            if (countryDataBase[i].name.toLowerCase() === countryName.toLowerCase()) {
                return countryDataBase[i].isoCode;
            }
        }
        return "";

    }

    const findStateIso = (stateName, countryIso) => {
        const stateDataBase = State.getStatesOfCountry(countryIso)

        for (let i = 0; i < stateDataBase.length; i++) {
            if (stateDataBase[i].name.toLowerCase() === stateName.toLowerCase()) {
                return stateDataBase[i].isoCode;
            }
        }
        return "";

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


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            // Reset the image and preview URL if no file is selected
            setImage(null);
            setPreviewUrl(null);
            
            
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        /*const formData = new FormData();
        formData.append('image', image);
        formData.append('userId',localStorage.getItem('id'));
        formData.append('location', location)
        formData.append('description', description);*/

        if(image === null){
            setDataValidity(true);
            setWarningText("Error: Image Required")
            return
        }else{
            setDataValidity(false)
            
        }
        console.log(import.meta.env.VITE_CLOUD_NAME);

        const cloudName = import.meta.env.VITE_CLOUD_NAME; // Replace with your Cloudinary cloud name
        const uploadPreset = import.meta.env.VITE_CLOUD_PRESENT; // Replace with your unsigned upload preset

        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", image);
        cloudinaryForm.append("upload_preset", uploadPreset);



        try {

            const cloudResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: cloudinaryForm
            });
            if (!cloudResponse.ok) {
                const errorData = await cloudResponse.json();
                console.error('Upload Error:', errorData);
                // Display an error message to the user
                return;
            }

            const data = await cloudResponse.json();

            const headers = { "Content-Type": "application/json" };
            // The URL of the uploaded image
            const imageUrl = data.secure_url;
            console.log(imageUrl);

            const url = "https://picarta.ai/classify";
            const payload = {
                TOKEN: import.meta.env.VITE_PIC_TOKEN,
                IMAGE: `${imageUrl}`
            };
            

            const formData = {
                imageUrl: imageUrl,
                userId: window.localStorage.getItem('id'),
                countryIso: "",
                stateIso: "",
                city: "",
                latitude: "",
                longitude: "",
                description: description
            };




            if (countryIso === '') {
                const picartaResponse = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload)
                })
                const data = await picartaResponse.json()
                console.log(data);
                formData.countryIso = findCountryIso(data.ai_country);
                if (formData.countryIso === "") {
                    throw new Error("Country isoCode not found!");
                }
                formData.stateIso = findStateIso(data.province, formData.countryIso);
                if (formData.stateIso === "") {
                    throw new Error("State isoCode not found!");
                }
                formData.city = data.city;
                formData.latitude = data.ai_lat;
                formData.longitude = data.ai_lon;
            } else if (stateIso === '') {
                formData.countryIso = countryIso;
                const countryInfo = Country.getCountryByCode(countryIso)
                formData.latitude = countryInfo.latitude;
                formData.longitude = countryInfo.longitude;
            }else if (city === ''){
                formData.countryIso = countryIso;
                formData.stateIso = stateIso;
                const countryStateData = State.getStateByCodeAndCountry(stateIso, countryIso);
                formData.latitude = countryStateData.latitude;
                formData.longitude = countryStateData.longitude;
            }else{
                formData.countryIso = countryIso;
                formData.stateIso = stateIso;
                formData.city = city;
                const cityData = findCityLocation(city,stateIso,countryIso);
                formData.latitude = cityData[0];
                formData.longitude = cityData[1];
            }
            
            const response = await axios.post("http://localhost:3000/images", formData);
            console.log('Image created:', response.data);
            history('/user');


            // Handle success (redirect, show message, etc.)
        } catch (error) {
            console.error('Error submitting:', error);
            setDataValidity(true);
            setWarningText('Error submitting: Something Went Wrong!');

        }
        // TODO: Implement the upload logic
        //console.log('Form Submitted', formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6">Upload Image</Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            {previewUrl && (
                <Box mt={2} mb={2}>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
            )}
            <FormSelects values={{ countryIso, stateIso, city, setCountryIso, setStateIso, setCity }} />
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
            <Collapse in={dataValid}>
                  <Alert severity="error"
                    action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                      setDataValidity(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                     }
                      sx={{ mb: 2 }}
                    >
                      {warningText}
                  </Alert>
                </Collapse>
                <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={6}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                
                sx={{ mt: 3, mb: 2 }}
            >
                Submit
            </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => history("/user")}
            >
                Cancel
            </Button>
            
            </Grid>
            </Grid>
        </Box>
    );
};

export default UploadForm;
