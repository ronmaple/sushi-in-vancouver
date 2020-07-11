const loadMarkers = (mapboxgl, map, state) => {
    return new mapboxgl.Marker()
        .setLngLat([state.coordinates.longitude, state.coordinates.latitude])
        .addTo(map);
}

export default loadMarkers;