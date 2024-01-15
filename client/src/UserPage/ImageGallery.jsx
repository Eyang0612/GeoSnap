import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function GeoImageList({ value }) {
    const itemData = value.itemData
    function hello(){
        console.log("hello world");
    }

    return (
        <Box sx={{ display: 'flex', overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8} sx={{ flexGrow: 100 }}>
                {itemData.map((item) => (
                    <ImageListItem key={item._id} onClick={()=> hello()}>
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
