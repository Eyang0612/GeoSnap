import {useState, useEffect}from 'react';
import { Modal, Box, Typography, Grid, Paper, Button} from '@mui/material';
import { Country, State, City } from 'country-state-city';
import WarningModal from './DeleteWarning';
import axios from "axios";
import EditModal from './EditDisplay';



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

const ImageModal = ({ open, onClose, imageData, deleteUpdate}) => {
    const [warningOpen, setWarningOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [imagePostData, setImagePostData] = useState(imageData);

    useEffect(()=>{
      setImagePostData(imageData)
    },[imageData])

    

    console.log(imagePostData);
    let countryInfo = Country.getCountryByCode(imagePostData.countryIso)
    let stateInfo = State.getStateByCodeAndCountry(imagePostData.stateIso, imagePostData.countryIso);
    let cityName = imagePostData.city;
    if(!countryInfo){
      countryInfo = {name: "",};
    }
    if(!stateInfo){
      stateInfo = {name: "",};
    }
    const gridItems = [
        { title: 'Country:', info: `${countryInfo.name}` },
        { title: 'State:', info: `${stateInfo.name}` },
        { title: 'City:', info: `${cityName}` },
      ];

      const handleDelete = async () =>{
    
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URI||'http://localhost:3000'}/user-images/${imagePostData._id}`);
            console.log('Image deleted successfully');
            setWarningOpen(false)
            onClose();
            deleteUpdate(imagePostData._id);
          } catch (error) {
            console.error('Error deleting image', error);
          }
    }
    const handleUpdate = async (data) =>{
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI||'http://localhost:3000'}/user-images/${imagePostData._id}`, data);
        console.log('Updated image data:', response.data);
        setImagePostData(response.data);
        // Handle the updated image data (e.g., update state or UI)
      } catch (error) {
        console.error('Error updating image', error);
      }

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
        <Grid container spacing={2}>
      {gridItems.map((item, index) => (
        <Grid item xs={4} sm={4} key={index}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>{item.info}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Paper style={{ padding: 16 }}>
    <Typography variant="h6">{"Description:"}</Typography>
        <Typography id="image-modal-description" sx={{ mt: 2 }}>
          {imagePostData.description}
        </Typography>
        </Paper>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Button fullWidth variant="outlined" onClick={() => setEditOpen(true)}>Edit</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button fullWidth variant="outlined" onClick ={()=> setWarningOpen(true)}>Delete</Button>
        </Grid>
      </Grid>
      <WarningModal open ={warningOpen} setOpen={(value)=>setWarningOpen(value)} handleDelete = {() => handleDelete()}/>
      <EditModal open ={editOpen} onClose={()=>setEditOpen(false)} imagePostData = {imagePostData} updateImagePostData={(data) => handleUpdate(data)}/>
      </Box>
    </Modal>
  );
};

export default ImageModal;
