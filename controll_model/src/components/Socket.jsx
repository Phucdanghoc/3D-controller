// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import QRCode from 'qrcode';
// import { useNavigate } from 'react-router-dom';

// // eslint-disable-next-line react/prop-types
// const WebSocketServer = ({ setZoom }) => {
//   const [qrCode, setQrCode] = useState('');
//   const [setClients] = useState([]);
//   const SERVER_URL = 'http://localhost:4000';
//   const navigate = useNavigate(); 

//   useEffect(() => {
    
//     QRCode.toDataURL(SERVER_URL)
//       .then((url) => {
//         setQrCode(url);
//       })
//       .catch((err) => {
//         console.error('QR Code Generation Error:', err);
//       });
    
//     const socket = io(SERVER_URL);
    
//     socket.on('connect', () => {
//       console.log(`Web client connected to ${SERVER_URL}`);
//     });

    
//     socket.on('app_connected_to_web', (data) => {
//       console.log('Device connected:', data);
//       setClients((prevClients) => [...prevClients, data]);
//       // navigate('/');
//     });

    
//     socket.on('zoomval', (value) => {
//       console.log('Received zoom value:', value);
//       setZoom(value); 
//     });
//     socket.on('val',(value) => {
//       console.log(value);
//     });
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });

//     socket.on('connect_error', (err) => {
//       console.error('Connection Error:', err);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [navigate, setClients, setZoom]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1 style={styles.title}>Connect Your Device</h1>
//         <p style={styles.subtitle}>Scan the QR code with your app to connect:</p>
//         {qrCode && <img src={qrCode} alt="QR Code" style={styles.qrCode} />}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
//   card: {
//     padding: '2rem',
//     background: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: '2rem',
//     marginBottom: '1rem',
//   },
//   subtitle: {
//     fontSize: '1.2rem',
//     marginBottom: '1rem',
//   },
//   qrCode: {
//     width: '200px',
//     margin: '0 auto',
//   },
// };

// export default WebSocketServer;
