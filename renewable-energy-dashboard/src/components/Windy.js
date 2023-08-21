import { useEffect } from "react";

// const apiKey = 'WTp0s6eUAz61Nq8QwUzGx4Qk3GW9ejQu';

const Windy = () => {
    useEffect(() => {
const options = {
    // Required: API key
    key: 'WTp0s6eUAz61Nq8QwUzGx4Qk3GW9ejQu', 

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 50.4,
    lon: 14.3,
    zoom: 5,
};

// Initialize Windy API
// eslint-disable-next-line no-undef
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    // eslint-disable-next-line no-undef
    L.popup()
        .setLatLng([50.4, 14.3])
        .setContent('Hello World')
        .openOn(map);
});
    }, []);

    return (
    <div className="windy-container">

    <div id="windy"></div>

    </div>
    )
}

export default Windy;