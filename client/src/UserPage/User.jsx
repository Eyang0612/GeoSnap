import UserNavBar from "./UserNav";
import GeoImageList from "./ImagePage/ImageGallery";
import {useState, useEffect} from "react";
import ImageModal from "./ImagePage/ImageDisplay";
import axios from 'axios';
import GeoMap from "./MapRender";
import {Box, LinearProgress, Typography} from '@mui/material';
import FolderOffIcon from '@mui/icons-material/FolderOff';


export default function User() {
    const [imageListData, setImageListData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userImageData, setUserImageData] = useState({countryIso: "IT", stateIso:"34"})//pass down default value such that ImageModal Renders
  const [openMap, setOpenMap] =useState(false);
  const [loadingDisplay, setLoadingDisplay] = useState('none');
  const [emptyCheck, setEmptyCheck] = useState(false);


    const setImageData = async () => { 
      setEmptyCheck(false);
      setLoadingDisplay('flexGrow');
        const userId = window.localStorage.getItem('id');
        const imageLoadData = await axios.get(`http://${import.meta.env.VITE_BACKEND_URI||'localhost:3000'}/images/${userId}`);
        console.log(imageLoadData);
        const response = imageLoadData.data;
        console.log(response);
        setImageListData(response);
        if(response.length === 0){
          setEmptyCheck(true);
        }
        setLoadingDisplay('none');
    }
    useEffect(() => {setImageData()},[]);

    const onDelete = (id) =>{
        const UpdatedArray = imageListData.filter((imageData) => !(imageData._id === id));
        setImageListData(UpdatedArray);

    }
    useEffect(() =>{
      if(imageListData.length === 0){
        setEmptyCheck(true);
      }else{
        setEmptyCheck(false)};
      },[imageListData])
  return (
    <>
    <UserNavBar setOpenMap ={(value)=>setOpenMap(value)} />
    <Box sx={{ position: 'absolute', top: '10%', left: 0, right: 0, width: '100%', display: `${loadingDisplay}`}}>
      <LinearProgress />
    </Box>
    <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} imageData={userImageData} deleteUpdate ={(id)=>onDelete(id)}/>
    {(emptyCheck&&!openMap)?<Box marginTop={20} sx={{display: 'flex', flexWrap: 'wrap',justifyContent:'center', alignItems: 'center'}}><FolderOffIcon sx={{ width: '100vw', fontSize: 200 }}/><Typography marginTop={20}variant={'h4'}sx={{textAlign: 'center'}}>Looks like you haven't Upload anything yet, try uploading</Typography></Box>:<div></div>}
    {openMap?<GeoMap 
    data = {imageListData} 
    onOpen = {() => setModalOpen(true)} 
    setUserImageData ={(value) => setUserImageData(value)}
    />:<GeoImageList 
    itemData = {imageListData} 
    onClick = {() => setModalOpen(true)} 
    setUserImageData ={(value) => setUserImageData(value)}/>
    }

    </>
      
  );
 
}
