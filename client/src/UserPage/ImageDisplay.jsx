import {useEffect,useState}from 'react';
import { Modal, Box, Typography, Grid, Paper, Button} from '@mui/material';
import { Country, State, City } from 'country-state-city';
import WarningModal from './DeleteWarning';



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

const ImageModal = ({ open, onClose, imageData}) => {
    const [warningOpen, setWarningOpen] = useState(false);

    console.log(imageData);
    const countryInfo = Country.getCountryByCode(imageData.countryIso)
    const stateInfo = State.getStateByCodeAndCountry(imageData.stateIso, imageData.countryIso);
    const cityName = imageData.city;
    console.log(countryInfo)
    const gridItems = [
        { title: 'Country:', info: `${countryInfo.name}` },
        { title: 'State:', info: `${stateInfo.name}` },
        { title: 'City:', info: `${cityName}` },
      ];

    

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <Box sx={style}>
        <img src={imageData.imageUrl} style={{ maxWidth: '100%' }} />
        <Grid container spacing={2}>
      {gridItems.map((item, index) => (
        <Grid item xs={12} sm={4} key={index}>
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
          {imageData.description}
        </Typography>
        </Paper>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Button fullWidth variant="outlined">Edit</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button fullWidth variant="outlined" onClick ={()=> setWarningOpen(true)}>Delete</Button>
        </Grid>
      </Grid>
      <WarningModal open ={warningOpen} setOpen={(value)=>setWarningOpen(value)}/>
      </Box>
    </Modal>
  );
};

export default ImageModal;
