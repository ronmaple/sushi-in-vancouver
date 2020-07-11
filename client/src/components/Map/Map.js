import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.scss";
import styled from 'styled-components';
import { sushiLogo } from '../../assets/webAssets';
import { popupOptions, geoLocationOptions } from './mapOptions';
import { VANCOUVER_LAT, VANCOUVER_LONG, LAYER_ID, ZOOM_PREFERENCE } from '../../constants';
import { loadMarkers, loadImageLayer, loadPopup, handleGeolocationChange } from './handlers';


export default function Map({ data }) {
    const [state, setState] = useState({ coordinates: { latitude: VANCOUVER_LAT, longitude: VANCOUVER_LONG }, data: {}, refetch_data: false })
    const mapboxElRef = useRef(null);
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapboxElRef.current,
            style: "mapbox://styles/ronmaple/ckbq1xlyb1cjc1ipdtut4ahwt",
            center: [state.coordinates.longitude, state.coordinates.latitude], // Vancouver [lat, long]
            zoom: ZOOM_PREFERENCE
        })


        map.once('load', function () {

            setState({ data: data })

            map.stateData = data;

            map.loadImage(sushiLogo, (error, image) => {
                if (error) throw error;

                loadMarkers(mapboxgl, map, state);
                loadImageLayer(map, image, data);

            });

            const popup = new mapboxgl.Popup(popupOptions);

            map.on("mousemove", LAYER_ID, e => { loadPopup(map, popup, e) })

            map.on('click', LAYER_ID, (e) => { loadPopup(map, popup, e) })

            const geolocate = new mapboxgl.GeolocateControl(geoLocationOptions)

            map.addControl(geolocate);

            geolocate.on('geolocate', function (e) { handleGeolocationChange(map, geolocate, e) })

        })
    }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <MapContainer className="mapContainer">
                <div className="mapBox" ref={mapboxElRef}>
                </div>
            </MapContainer>
        </>
    )
}

const MapContainer = styled.div`
    width: 100%;
    height: 100%;

    .mapBox {
        width: 100%;
        height: 100%;
    }
`