import popupHTML from './sub/popupHTML';

const loadPopup = (map, popup, e) => {
    const { properties, geometry: { coordinates } } = e.features[0];

    map.getCanvas().style.cursor = "pointer";

    const popupDetails = properties;
    const popupCoordinates = coordinates.slice();

    const HTML = popupHTML(popupDetails)

    popup
        .setLngLat(popupCoordinates)
        .setHTML(HTML)
        .addTo(map);
}

export default loadPopup