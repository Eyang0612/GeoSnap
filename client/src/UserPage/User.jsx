import UserNavBar from "./UserNav";
import GeoImageList from "./ImagePage/ImageGallery";
import {useState, useEffect} from "react";
import ImageModal from "./ImagePage/ImageDisplay";
import axios from 'axios';
import GeoMap from "./MapRender";


export default function User() {
    const [imageListData, setImageListData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userImageData, setUserImageData] = useState({countryIso: "IT", stateIso:"34"})//pass down default value such that ImageModal Renders
  const [openMap, setOpenMap] =useState(false);


    const setImageData = async () => { 
        const userId = window.localStorage.getItem('id');
        const imageLoadData = await axios.get(`http://localhost:3000/images/${userId}`);
        const response = imageLoadData.data;
        console.log(response);
        setImageListData(response)
    }
    useEffect(() => {setImageData()},[]);

    const onDelete = (id) =>{
        const UpdatedArray = imageListData.filter((imageData) => !(imageData._id === id));
        setImageListData(UpdatedArray);

    }
  return (
    <>
    <UserNavBar setOpenMap ={(value)=>setOpenMap(value)} />
    <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} imageData={userImageData} deleteUpdate ={(id)=>onDelete(id)}/>
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
