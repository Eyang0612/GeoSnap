/*import ReactMapboxGl, {Layers, Feature} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const INITIAL_VIEW_STATE = {
    latitude: 39.8283,
    longittude: -98.5795,
    zoom: 3,
    bearing: 0,
    pitch: 30
}
const Map = ReactMapboxGl({
    accessToken:
      import.meta.env.VITE_MAPBOX_TOKEN
  });

const GeoMap = () =>{
    console.log(MAPBOX_TOKEN)
    return (
        
        <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
       

    )

};

export default GeoMap;*/