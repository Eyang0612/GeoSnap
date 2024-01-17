import {Box, Modal, Button} from '@mui/material';
import {useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
export default function WarningModal({open, setOpen}) {
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete = () => {
        
    }
  
    return (
      
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Are you Sure You want to delete this Image?</h2>
            <Button onClick={handleClose}>I changed my mind.</Button>
            <Button onClick={handleDelete}>Yes, Delete.</Button>
          </Box>
        </Modal>
    );
  }