import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.scss";
import styled from 'styled-components';
import useFetchData from './hooks/useFetchData';
import Spinner from './components/subcomponents/Spinner';
import Map from './components/Map/Map';


const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

function App() {

  const { data, loading } = useFetchData();

  return (
    <div className="App">
      {loading ?
        <LoadingWrapper>
          <Spinner />
        </LoadingWrapper> :
        <Map data={data}></Map>
      }
    </div>
  );
}

export default App;
