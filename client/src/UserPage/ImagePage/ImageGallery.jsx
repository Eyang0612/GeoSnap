import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function GeoImageList({ itemData, onClick, setUserImageData}) {
    const handleClick = async (id) => {
      try{
        await axios.get(`http://${import.meta.env.VITE_BACKEND_URI||'localhost:3000'}/user-images/${id}`)
        .then((response) => setUserImageData(response.data)).then(()=>onClick())
        /*const response = imageLoadData;
        console.log(response);
        setUserImageData(response);
        onClick();*/
      }catch(error){
        
      }
        
    }
    const [columns, setColumns] = useState(3);

    useEffect(() => {
      const handleResize = () => {
       if (window.innerWidth >= 960) {
          setColumns(3);
        } else if (window.innerWidth >= 600) {
          setColumns(2);
        } else {
          setColumns(1);
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Box sx={{ display: 'flex', overflowY: 'scroll', mt: 10}}>
            <ImageList variant="masonry" cols={columns} gap={8} sx={{ flexGrow: 100 }}>
                {itemData.map((item) => (
                    <ImageListItem key={item._id} onClick={()=> handleClick(item._id)}>
                        <img
                            srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
