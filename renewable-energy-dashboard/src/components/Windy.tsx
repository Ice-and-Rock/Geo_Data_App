// import { useEffect } from "react";

// // const apiKey = 'WTp0s6eUAz61Nq8QwUzGx4Qk3GW9ejQu';

// const Windy = () => {
//     useEffect(() => {
// const options = {
//     // Required: API key
//     // key: 'WTp0s6eUAz61Nq8QwUzGx4Qk3GW9ejQu', 
//     key: 'JyidCjUfZW9GgLRsa4exWei2tIDs9OCb',

//     // Put additional console output
//     verbose: false,

//     // Optional: Initial state of the map
//     lat: 57.14369,
//     lon: -2.09814,
//     zoom: 5,
// };

// // Initialize Windy API
// // eslint-disable-next-line no-undef
// windyInit(options, windyAPI => {
//     // windyAPI is ready, and contain 'map', 'store',
//     // 'picker' and other usefull stuff

//     const { map } = windyAPI;
//     // .map is instance of Leaflet map

//     // eslint-disable-next-line no-undef
//     L.popup()
//         .setLatLng([${lat}, ${lon}])
//         .setContent('Is this where you want to go?')
//         .openOn(map);
// });
//     }, []);

//     return (
//     <div className="windy-container">

//     <div id="windy"></div>

//     </div>
//     )
// }

// export default Windy;

import React, { useEffect, useState } from "react";
import LocationButtons from "./LocationButtons";

interface WindyProps {
  popupLat: number;
  popupLon: number;
}
declare global {
  interface Window {
    windyInit: (options: any, callback: (windyAPI: any) => void) => void;
    L: any;
  }
}

const Windy: React.FC<WindyProps> = ({ popupLat, popupLon }) => {

  useEffect(() => {
    const options = {
      key: "WTp0s6eUAz61Nq8QwUzGx4Qk3GW9ejQu",
      verbose: false,
      lat: 45.9237,
      lon: 6.8694,
      zoom: 5,
    };

    // // Initialize Windy API
    // eslint-disable-next-line no-undef
    window.windyInit(options,(windyAPI: any) => {
      const { map } = windyAPI;

      // eslint-disable-next-line no-undef
      window.L.popup()
        .setLatLng([popupLat, popupLon])
        .setContent("Is this where you want to go?")
        .openOn(map);
    });
  }, [popupLat, popupLon]);

  

  return (
    <div className="windy-container">
      <div id="windy"></div>
    </div>
  );
};

export default Windy;
