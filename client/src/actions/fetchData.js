import axios from 'axios'
import { VANCOUVER_LAT, VANCOUVER_LONG, DEFAULT_ESTABLISHMENT } from '../constants';

export default async function fetchData(latitude, longitude, establishment) {

    const lat = latitude || VANCOUVER_LAT;
    const long = longitude || VANCOUVER_LONG;
    const establishmentType = establishment || DEFAULT_ESTABLISHMENT; // for future update where food type is dynamic

    const URL = process.env.REACT_APP_API_BASE + `&lat=${lat}&lon=${long}&radius=1000&establishment_type=${establishmentType}&sort=real_distance`;

    const data = await axios
        .get(URL, {
            headers: {
                'user-key': process.env.REACT_APP_ZOMATO_API_KEY
            }
        })
        .then(({ data: { restaurants } }) => {

            return restaurants.map(({
                restaurant: {
                    thumb,
                    user_rating: {
                        aggregate_rating:
                        stars,
                        rating_text
                    },
                    location,
                    name
                } }, key) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            location.longitude,
                            location.latitude
                        ]
                    },
                    properties: {
                        id: key,
                        name: name,
                        address: `${location.address}`,
                        rating: `${stars} ${'★'.repeat(parseInt(stars))} - ${rating_text}`,
                        thumbnail: thumb,
                    }
                }))

        })
        .catch(err => console.error(err))

    return data;

}