/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.

// Can be implemented in future 
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { useParams } from 'react-router-dom';
export const CountryState = () => {
    let params = useParams()
    let [startlatitude, setStartlatitude] = useState(Number(params.startLat))
    let [startlongitude, setStartlongitude] = useState(Number(params.startLon))
    let [endlatitude, setEndlatitude] = useState(Number(params.endLat))
    let [endlongitude, setEndlongitude] = useState(Number(params.endLon))
    // Need to change this to env file
    mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
    const mapContainer = useRef(null);
    let map = useRef();
    const [lng, setLng] = useState(startlongitude);
    const [lat, setLat] = useState(startlatitude);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving'
        })
        map.current.addControl(directions, 'top-left');
        map.current.on('load', function () {
            directions.setOrigin([startlongitude, startlatitude]);
            directions.setDestination([endlongitude, endlatitude]);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
