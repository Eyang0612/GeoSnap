import Map from 'react-map-gl';
import DeckGl, {GeoJsonLayer} from 'deck.gl'
import  GeoJSON  from 'geojson';
import axios from 'axios'

export default function GeoMap({data, setUserImageData, onOpen}) {

  const onClick = async (info)=>{
    console.log(info);
    try{
      await axios.get(`http://localhost:3000/user-images/${info.object.properties._id}`)
      .then((response) => setUserImageData(response.data)).then(()=>onOpen())
      
    }catch(error){
      console.log(error)
    }
      
  }
const layers =[
  new GeoJsonLayer(
    {
      id: "Your Gallery",
      data: GeoJSON.parse(data, {Point: ['latitude', 'longitude'], include: ['_id']}),

      //Styles:
      filled: true,
      pointRadiusMinPixels: 5,
      pointRadiusScale: 2000,
      getPointRadius: f => 5,
      getFillColor: [86, 86, 86, 86],
      pickable: true,
      autoHighlight: true,
      onClick

    }
  ) 
]
console.log(layers);

  return <DeckGl controller ={true}
  initialViewState={{
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  }}
  layers = {layers}
  >
  <Map
    mapLib={import('mapbox-gl')}
    
    
    mapStyle="mapbox://styles/mapbox/streets-v9?access_token=TOKEN"
    mapboxAccessToken ={ import.meta.env.VITE_MAPBOX_TOKEN }
  />
  </DeckGl>
}