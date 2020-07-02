import React, { useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.scss";
import styled from 'styled-components';
import fetchData from './hooks/fetchData';
import Spinner from './components/subcomponents/Spinner';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const sushiLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Eucalyp-Deus_Sushi.png/50px-Eucalyp-Deus_Sushi.png";

function App() {
  const mapboxElRef = useRef(null);

  const { data, loading } = fetchData();

  useEffect(() => {
    // currently hard coded -- TODO: dynamic fetching with Firebase data
    if (!loading) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/ronmaple/ckbq1xlyb1cjc1ipdtut4ahwt",
        center: [-123.122, 49.283], // Vancouver [lat, long]
        zoom: 13.5
      })

      map.once('load', function () {

        map.loadImage(sushiLink, function (error, image) {
          if (error) throw error;

          map.addImage('sushi', image);

          map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: data
            }
          })

          map.addLayer({
            id: 'circles',
            type: 'symbol',
            source: 'point',
            layout: {
              'icon-image': 'sushi',
              'icon-size': 1
            }
          })
        })

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })

        let lastId;

        map.on("mousemove", "circles", e => {
          const id = e.features[0].properties.id;

          if (id !== lastId) {

            map.getCanvas().style.cursor = "pointer";

            const { name, address, rating, thumbnail } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            const nameHTML = `<h2>${name}</h2>`;
            const addressHTML = `<p>${address}</p>`;
            const ratingHTML = `<p>${rating}</p>`;
            const thumbnailImage = `
            <div style='
              width: 100%; 
              height: 100px;
              max-width: 200px;
              background-image: url(${thumbnail});
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              overflow: hidden;
              '
            </div>`;

            const HTML = `
              <div style='
                height: 200px; 
                width: 200px;
              '>
              <div>
                ${nameHTML}
                ${addressHTML}
                ${ratingHTML}
              </div>
                ${thumbnailImage}
              </div>
            `


            popup
              .setLngLat(coordinates)
              .setHTML(HTML)
              .addTo(map);

          }
          // Need this for when the locator is dynamic
          // while (Math.abs(e.lngLat.lng - coordinates[0] > 180)) {
          //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          // }

        })

        map.on("mouseleave", "circles", function () {
          // Reset the last Id
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

      })
    }

  }, [data])

  return (
    <div className="App">


      <div className="mapContainer">
        {loading ?
          <LoadingWrapper>
            <Spinner />
          </LoadingWrapper> :
          <div className="mapBox" ref={mapboxElRef}>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
