import { LAYER_ID, MAP_SYMBOL, MAP_SOURCE } from '../../constants';

export const sushiLayer = {
    id: LAYER_ID,
    type: 'symbol',
    source: MAP_SOURCE,
    layout: {
        'icon-image': MAP_SYMBOL,
        'icon-size': 1
    }
};

export const geoJsonData = (data) => ({
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: data
    }
})

export const popupOptions = {
    closeButton: true,
    closeOnClick: true
}

export const geoLocationOptions = {
    positionOptions: {
        enableHighAccuracy: true,
        showAccuracyCircle: true,
    },
    fitBoundsOptions: {
        maxZoom: 15
    },
}

