// import React from "react";

// interface LocationButtonsProps {
//   onLocationChange: (lat: number, lon: number) => void;
// }

// const LocationButtons: React.FC<LocationButtonsProps> = ({ onLocationChange }) => {
//   return (
//     <div>
//       <button className="location-button" onClick={() => onLocationChange(57.14369, -2.09814)}>
//         Oil Rig 1
//       </button>
//       <button className="location-button" onClick={() => onLocationChange(56.048, -1.132)}>
//         Oil Rig 2
//       </button>
//       <button className="location-button" onClick={() => onLocationChange(57.919, -1.803)}>
//         Oil Rig 3
//       </button>
//     </div>
//   );
// };

// export default LocationButtons;

import React from "react";

interface LocationButtonsProps {
  onLocationChange: (lat: number, lon: number) => void;
}

const LocationButtons: React.FC<LocationButtonsProps> = ({ onLocationChange }) => {
  return (
    <div className="location-buttons">
      <button className="location-button" onClick={() => onLocationChange(45.9237, 6.8694)}>Oil Rig 1</button>
      <button className="location-button" onClick={() => onLocationChange(46.123, 6.922)}>Oil Rig 2</button>
      <button className="location-button" onClick={() => onLocationChange(47.225, 6.688)}>Oil Rig 3</button>
    </div>
  );
};

export default LocationButtons;

