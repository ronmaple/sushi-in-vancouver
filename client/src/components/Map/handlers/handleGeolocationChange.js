import fetchData from '../../../actions/fetchData';
import { MAP_SOURCE, ZOOM_PREFERENCE } from '../../../constants';

function handleGeolocationChange(map, geolocate, { coords: { latitude, longitude } }) {

    const APPROX_3KM = 3000;

    geolocate._accuracy = APPROX_3KM;

    fetchData(latitude, longitude)
        .then(res => {
            map.getSource(MAP_SOURCE).setData({
                type: "FeatureCollection",
                features: res
            })

            map.flyTo({
                center: [longitude, latitude],
                zoom: ZOOM_PREFERENCE //set zoom 
            });

            return res
        })
        .catch(err => console.error(err))

}

export default handleGeolocationChange;