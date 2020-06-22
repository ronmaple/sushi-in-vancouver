import React, { useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
// import styled from "styled-components";
// import axios 
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.scss";

const mapboxKey = process.env.REACT_APP_MAPBOX_API_KEY

mapboxgl.accessToken = mapboxKey

console.log('mapboxKey: ', mapboxKey, ' typeof: ', typeof mapboxKey);


console.log('process.env', process.env.REACT_APP_MAPBOX_API_KEY)

// const MapContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   background: red;
// `
// const MapBox = styled.div`
//   width: 100%;
//   height: 100%;
// `
function App() {
  const mapboxElRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapboxElRef.current,
      style: "mapbox://styles/ronmaple/ckbq1xlyb1cjc1ipdtut4ahwt",
      center: [-123.07, 49.29], // Vancouver [lat, long]
      zoom: 12
    })

    map.addControl(new mapboxgl.NavigationControl())
  }, [])
  return (
    <div className="App">
      <div className="mapContainer">
        <div className="mapBox" ref={mapboxElRef}>
        </div>
      </div>
    </div>
  );
}

export default App;

{/* <MapContainer className="mapContainer">
<MapBox className="mapBox" ref={mapboxElRef}>

</MapBox>
</MapContainer> */}