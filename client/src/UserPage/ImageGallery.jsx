import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';

export default function GeoImageList({ itemData, onClick, setUserImageData}) {
    const handleClick = async (id) => {
        await axios.get(`http://localhost:3000/user-images/${id}`)
        .then((response) => setUserImageData(response.data)).then(()=>onClick())
        /*const response = imageLoadData;
        console.log(response);
        setUserImageData(response);
        onClick();*/
        
    }

    return (
        <Box sx={{ display: 'flex', overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8} sx={{ flexGrow: 100 }}>
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
