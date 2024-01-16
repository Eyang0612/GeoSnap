import {useEffect,useState}from 'react';
import { Modal, Box, Typography } from '@mui/material';

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
    console.log(imageData);
    

    

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <Box sx={style}>
        <img src={imageData.imageUrl} style={{ maxWidth: '100%' }} />
        <Typography id="image-modal-title" variant="h6" component="h2">
          {imageData.imageUrl}
        </Typography>
        <Typography id="image-modal-description" sx={{ mt: 2 }}>
          {imageData.description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ImageModal;
