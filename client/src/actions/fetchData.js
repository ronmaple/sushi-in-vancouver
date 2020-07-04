import axios from 'axios'

export default async function fetchData() {
    const data = await axios
        .get(process.env.REACT_APP_ZOMATO_API_URL, {
            headers: {
                'user-key': process.env.REACT_APP_ZOMATO_API_KEY
            }
        })
        .then(res => {

            console.log('res.data', res.data)

            const { restaurants } = res.data;

            const restaurantData = restaurants.map(({
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
            console.log('restaurantData', restaurantData);

            return restaurantData;
        })
        .catch(err => console.error(err))

    return data;

}