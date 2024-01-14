import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Country, State, City }  from 'country-state-city';
import axios from 'axios';

const UploadForm = () => {
    const history = useNavigate();
    const country = Country.getAllCountries()
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        /*const formData = new FormData();
        formData.append('image', image);
        formData.append('userId',localStorage.getItem('id'));
        formData.append('location', location)
        formData.append('description', description);*/

        const cloudName = 'dwcrq6adk'; // Replace with your Cloudinary cloud name
        const uploadPreset = 't1cuz9rh'; // Replace with your unsigned upload preset
        
       

        
    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", image);
    cloudinaryForm.append("upload_preset", uploadPreset);
        
     /*  const url = "https://picarta.ai/classify";
    const payload = {
    "TOKEN": "X2I2NBC88DIVDLXZEYVJ", 
    "PATH": "https://upload.wikimedia.org/wikipedia/commons/8/83/San_Gimignano_03.jpg"
};*/
let Imagelocation = {};
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
                    TOKEN: "X2I2NBC88DIVDLXZEYVJ", 
                    IMAGE: `${imageUrl}`
                    };
                /*const payload = new FormData();
                payload.append("TOKEN", "X2I2NBC88DIVDLXZEYVJ");
                payload.append("PATH", `${imageUrl}`);*/
        
        const formData = {
            image: image,
            userId: window.localStorage.getItem('id'),
            location: location,
            description: description
        }; 
        console.log(formData);   
        console.log(JSON.stringify(payload));


        if(location === ""){
            
           fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Upload Error:', errorData);
                }
                return (response.json());
            })
            .then((result) => {
                console.log(result);
            })
        }
                      
        

           //const response = await axios.post("http://localhost:3000/upload", formData);
            //console.log('Image created:', response.data);
            history('/login');
            
            // Handle success (redirect, show message, etc.)
          } catch (error) {
            console.error('Error creating user:', error);
            
          }
        history('/user');

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
                multiple
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
            <TextField
                margin="normal"
                
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                autoFocus
                value={location}
                onChange={handleLocationChange}
            />
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default UploadForm;
