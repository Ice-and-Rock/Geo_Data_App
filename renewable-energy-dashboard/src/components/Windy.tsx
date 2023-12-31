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

import { useEffect } from "react";

interface WindyProps {
  popupLat: number;
  popupLon: number;
  popupLocationName: string;
}
declare global {
  interface Window {
    windyInit: (options: any, callback: (windyAPI: any) => void) => void;
    L: any;
  }
}

const Windy: React.FC<WindyProps> = ({ popupLat, popupLon, popupLocationName }) => {

  console.log("popupLat:", popupLat)
  console.log("popupLon:", popupLon)
  console.log("popupLocationName:", popupLocationName)

  useEffect(() => {
    const options = {
      key: "WTp0s6eUAz61Nq8QwUzGx4Qk3GW9ejQu",
      verbose: false,
      lat: popupLat,
      lon: popupLon,
      zoom: 6,
    };

    // // Initialize Windy API
    // eslint-disable-next-line no-undef
    window.windyInit(options,(windyAPI: any) => {
      const { map } = windyAPI;

      // eslint-disable-next-line no-undef
      window.L.popup()
        .setLatLng([popupLat, popupLon])
        .setContent([popupLocationName])
        .openOn(map);
    });
  }, [popupLat, popupLon, popupLocationName]);

  

  return (
    <div className="windy-container">
      <div id="windy"></div>
    </div>
  );
};

export default Windy;
