import { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import DeckGl, { GeoJsonLayer, FlyToInterpolator } from 'deck.gl';
import GeoJSON from 'geojson';
import axios from 'axios';

export default function GeoMap({ data, setUserImageData, onOpen }) {
  const [layers, setLayers] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    pitch: 0,
    bearing: 0
  });

  const onClick = async (info) => {
    console.log(info);
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_URI||'localhost:3000'}/user-images/${info.object.properties._id}`);
      setUserImageData(response.data);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLayers([
      new GeoJsonLayer({
        id: "Your Gallery",
        data: GeoJSON.parse(data, {Point: ['latitude', 'longitude'], include: ['_id']}),
        filled: true,
        pointRadiusMinPixels: 5,
        pointRadiusScale: 2000,
        getPointRadius: f => 5 + (viewState.zoom - 3), // Dynamic radius based on zoom level
        getFillColor: [255, 86, 86, 255],
        pickable: true,
        autoHighlight: true,
        onClick,
        onHover: ({object, x, y}) => {
          // Implement tooltip logic here
        }
      })
    ]);
  }, [data, viewState.zoom]);

  return (
    <DeckGl
    
      initialViewState={viewState}
      controller={true}
      layers={layers}
      onViewStateChange={({viewState}) => setViewState(viewState)}
    >
      <Map
        mapLib={import('mapbox-gl')}
        mapStyle="mapbox://styles/mapbox/outdoors-v12?access_token=TOKEN"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      />
    </DeckGl>
  );
}
