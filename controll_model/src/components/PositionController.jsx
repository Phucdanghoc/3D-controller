// import React, { useState, useEffect } from 'react';
// import Draggable from 'react-draggable';
// import { gsap } from 'gsap';


// const PositionController = ({ position, rotation, onChangePosition, onChangeRotation, isRotating, onToggleRotate }) => {
//   const [currentPosition, setCurrentPosition] = useState(position);
//   const [currentRotation, setCurrentRotation] = useState(rotation);


//   useEffect(() => {
//     gsap.to(currentPosition, {
//       x: - position[0],
//       y: position[1],
//       z: position[2],
//       duration: 1,
//       onUpdate: () => setCurrentPosition([currentPosition.x, currentPosition.y, currentPosition.z]),
//     });
//   }, [position]);


//   useEffect(() => {
//     gsap.to(currentRotation, {
//       x: rotation[0],
//       y: rotation[1],
//       z: rotation[2],
//       duration: 1,
//       onUpdate: () => setCurrentRotation([currentRotation.x, currentRotation.y, currentRotation.z]),
//     });
//   }, [rotation]);

//   const handlePositionChange = (axis, value) => {
//     const newPosition = [...currentPosition];
//     newPosition[axis] = value;
//     setCurrentPosition(newPosition);
//     onChangePosition(newPosition);
//   };

//   const handleRotationChange = (axis, value) => {
//     const newRotation = [...currentRotation];
//     newRotation[axis] = value;
//     setCurrentRotation(newRotation);
//     onChangeRotation(newRotation);
//   };

//   return (
//     <Draggable>
//       <div style={styles.container}>
//         <h3 style={styles.title}>Position Controller</h3>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}> X:</label>
//           <input
//             type="number"
//             value={currentPosition[0]}
//             onChange={(e) => {
//               const value = parseFloat(e.target.value);
//               handlePositionChange(0, value);
//             }}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Y:</label>
//           <input
//             type="number"
//             value={currentPosition[1]}
//             onChange={(e) => {
//               const value = parseFloat(e.target.value);
//               handlePositionChange(1, value);
//             }}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Z:</label>
//           <input
//             type="number"
//             value={currentPosition[2]}
//             onChange={(e) => {
//               const value = parseFloat(e.target.value);
//               handlePositionChange(2, value);
//             }}
//             style={styles.input}
//           />
//         </div>
//         <h3 style={styles.title}>Rotation Controller</h3>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Rotation X:</label>
//           <input
//             type="number"
//             value={currentRotation[0]}
//             onChange={(e) => {
//               const value = parseFloat(e.target.value);
//               handleRotationChange(0, value);
//             }}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Rotation Y:</label>
//           <input
//             type="number"
//             value={currentRotation[1]}
//             onChange={(e) => {
//               const value = parseFloat(e.target.value);
//               handleRotationChange(1, value);
//             }}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Rotation Z:</label>
//           <input
//             type="number"
//             value={currentRotation[2]}
//             onChange={(e) => {
//               const value = parseFloat(e.target.value);
//               handleRotationChange(2, value);
//             }}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.switchGroup}>
//           <label style={styles.switchLabel}>
//             <input
//               type="checkbox"
//               checked={isRotating}
//               onChange={onToggleRotate}
//               style={styles.checkbox}
//             />
//             Rotate Model
//           </label>
//         </div>
//       </div>
//     </Draggable>
//   );
// };

// const styles = {
//   container: {
//     position: 'absolute',
//     top: '10px',
//     left: '10px',
//     backgroundColor: 'black',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
//     zIndex: 1000,
//   },
//   title: {
//     margin: '0 0 10px 0',
//     fontSize: '1.2em',
//     textAlign: 'center',
//   },
//   inputGroup: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   label: {
//     flex: '0 0 120px',
//   },
//   input: {
//     flex: '1',
//     padding: '5px',
//     width: '100%',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   switchGroup: {
//     display: 'flex',
//     alignItems: 'center',
//     marginTop: '10px',
//   },
//   switchLabel: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   checkbox: {
//     marginRight: '8px',
//   },
// };

// export default PositionController;
