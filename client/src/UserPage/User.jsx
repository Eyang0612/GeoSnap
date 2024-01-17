import UserNavBar from "./UserNav";
import GeoImageList from "./ImageGallery";
import {useState, useEffect} from "react";
import ImageModal from "./ImageDisplay";

import axios from 'axios';


export default function User() {
    const [imagelistData, setImageListData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userImageData, setUserImageData] = useState({countryIso: "IT", stateIso:"34"}) //pass down default value such that ImageModal Renders


    const setImageData = async () => { 
        const userId = window.localStorage.getItem('id');
        const imageLoadData = await axios.get(`http://localhost:3000/images/${userId}`);
        const response = imageLoadData.data;
        console.log(response);
        setImageListData(response)
    }
    useEffect(() => {setImageData()},[]);

    const onDelete = (id) =>{
        const UpdatedArray = imagelistData.filter((imageData) => !(imageData._id === id));
        setImageListData(UpdatedArray);

    }
  return (
    <>
    <UserNavBar/>
    <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} imageData={userImageData} deleteUpdate ={(id)=>onDelete(id)}/>
    <GeoImageList itemData = {imagelistData} onClick = {() => setModalOpen(true)} setUserImageData ={(value) => setUserImageData(value)}/>
    </>
      
   
  );
}
