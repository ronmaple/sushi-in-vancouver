import { useEffect, useState } from 'react';
import fetchData from '../actions/fetchData';

export default () => {
    const [state, setState] = useState({ data: [], loading: true });

    useEffect(() => {
        fetchData()
            .then(res => {
                console.log('res in fetchData callback', res)
                setState({
                    data: res,
                    loading: false
                })
            }).catch(err => console.error(err));
    }, [])

    return state
}
