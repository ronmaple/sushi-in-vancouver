import { sushiLayer, geoJsonData } from '../mapOptions';
import { MAP_SOURCE, MAP_SYMBOL } from '../../../constants';

const loadImageLayer = (map, image, data) => {

    map.addImage(MAP_SYMBOL, image);

    map.addSource(MAP_SOURCE, geoJsonData(data))

    map.addLayer(sushiLayer)
}

export default loadImageLayer;