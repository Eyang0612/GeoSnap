import UserNavBar from "./UserNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeoImageList from "./ImageGallery";
import {useState, useEffect} from "react";
import axios from 'axios';


export default function User() {
    const [imagelistData, setImageListData] = useState([])


    const setImageData = async () => { 
        const userId = window.localStorage.getItem('id');
        const imageLoadData = await axios.get(`http://localhost:3000/images/${userId}`);
        const response = imageLoadData.data;
        console.log(response);
        setImageListData(response)
    }
    useEffect(() => {setImageData()},[]);
  return (
    <>
    <UserNavBar/>
      
    <GeoImageList value ={ {itemData: imagelistData }}/>
    </>
      
   
  );
}
