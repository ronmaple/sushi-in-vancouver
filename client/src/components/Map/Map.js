import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.scss";
import styled from 'styled-components';
import popupHTML from './sub/popupHTML';
import InfoModal from './sub/InfoModal';
import InfoOverlay from './sub/InfoOverlay';

export default function Map({ data, loading }) {
    const [state, setState] = useState({ coordinates: { latitude: 49.283, longitude: -123.122 }, data: {}, isModalOpen: false })
    const mapboxElRef = useRef(null);
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

    const testNewData = [{
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [-123.0937344, 49.2777428]
        },
        properties: {
            id: 21,
            name: "Maku",
            address: "Pizza place",
            rating: "4.9 ★★★★ - Excellent",
            thumbnail: "https://media-cdn.tripadvisor.com/media/photo-s/17/5b/e1/a2/dom-sushi-gdansk.jpg"
        }
    }]

    const sushiImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Eucalyp-Deus_Sushi.png/50px-Eucalyp-Deus_Sushi.png";



    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapboxElRef.current,
            style: "mapbox://styles/ronmaple/ckbq1xlyb1cjc1ipdtut4ahwt",
            center: [state.coordinates.longitude, state.coordinates.latitude], // Vancouver [lat, long]
            zoom: 13.5
        })

        map.once('load', function () {

            console.log('initial load props.data', data);
            setState({ data: data })
            console.log('after setState state.data', state.coordinates);

            map.loadImage(sushiImage, (error, image) => {
                if (error) throw error;

                console.log('loadMapIcons, placesData', data)
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
            });


            const popup = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: true
            })

            let lastId;

            map.on("mousemove", "circles", e => {
                const id = e.features[0].properties.id;

                if (id !== lastId) {

                    map.getCanvas().style.cursor = "pointer";

                    const popupDetails = e.features[0].properties;
                    const coordinates = e.features[0].geometry.coordinates.slice();

                    const HTML = popupHTML(popupDetails)

                    popup
                        .setLngLat(coordinates)
                        .setHTML(HTML)
                        .addTo(map);
                }

            })

            map.on('click', 'circles', (e) => {
                const { properties, geometry: { coordinates: _coordinates } } = e.features[0];

                const { id } = properties

                if (id !== lastId) {

                    map.getCanvas().style.cursor = "pointer";

                    const popupDetails = properties;
                    const coordinates = _coordinates.slice();

                    const HTML = popupHTML(popupDetails)

                    popup
                        .setLngLat(coordinates)
                        .setHTML(HTML)
                        .addTo(map);
                }
            })

            let geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                    watchPosition: true,
                    showAccuracyCircle: false,
                },
                fitBoundsOptions: {
                    maxZoom: 17
                },
            }, { _accuracy: 1000 })

            map.addControl(geolocate)
            geolocate.on('geolocate', function ({ coords: { latitude, longitude } }) {
                this._accuracy = 1000;
                const tmpData = data;

                setState({
                    coordinates: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    data: { ...tmpData, testNewData }
                })

                const mergedData = [...tmpData, ...testNewData]
                console.log('mergedData', mergedData)
                console.log('map.getSource', map.getSource('point'))
                map.getSource('point').setData({
                    type: "FeatureCollection",
                    features: mergedData
                })


            })

            console.log('geolocate', geolocate)

        })
    }, [])

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