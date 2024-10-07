import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { io } from 'socket.io-client';
import QRCode from 'qrcode';
import Model from './Model';
import { useNavigate } from 'react-router-dom';

const CombinedComponent = () => {
  const [qrCode, setQrCode] = useState('');
  const [zoomVal, setZoomVal] = useState(1);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [showAlert, setShowAlert] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const SERVER_URL = 'http://localhost:4000';
  const navigate = useNavigate();
  const controlsRef = useRef();

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(SERVER_URL);
        setQrCode(url);
      } catch (err) {
        console.error('QR Code Generation Error:', err);
      }
    };

    generateQRCode();

    const socket = io(SERVER_URL);

    socket.on('connect', () => console.log(`Web client connected to ${SERVER_URL}`));

    socket.on('app_connected_to_web', (data) => {
      console.log('Device connected:', data);
      setDeviceData(data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setDeviceData(null);
      }, 5000);
    });

    socket.on('zoomval', (value) => {
      console.log('Received zoom value:', value);
      setZoomVal(value);
    });

    socket.on('cursor_position', (value) => {
      const rotationScaleFactor = 0.0005;
      console.log('Received rotation values:', value);
      setRotation((prevRotation) => [
        prevRotation[0] + value.y * rotationScaleFactor,
        prevRotation[1] + value.x * rotationScaleFactor,
        prevRotation[2],
      ]);
    });
    socket.on('reset_positon',() =>{
      setRotation([0,0,0]);
    });
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('connect_error', (err) => console.error('Connection Error:', err));

    return () => {
      socket.disconnect();
    };
  }, [navigate]);



  return (
    <div style={styles.container}>
      <div style={styles.canvasWrapper}>
        <Canvas style={styles.canvas} shadows>
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 15, 15]} angle={0.1} penumbra={1} decay={0} intensity={1} castShadow />
          <pointLight position={[-15, -15, -15]} decay={0} intensity={1} />
          <Model position={[0, 0, 0]} rotation={rotation} zoom={zoomVal} />
          <OrbitControls ref={controlsRef} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>

      {qrCode && (
        <div style={styles.qrCodeDialog}>
          <img src={qrCode} alt="QR Code" style={styles.qrCode} />
        </div>
      )}

      {showAlert && (
        <div style={styles.alert}>
          <p>{deviceData ? `${deviceData} connected` : 'Loading...'}</p>
        </div>
      )}
    </div>
  );
};

// Styles for the combined component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: 'white',
    color: 'black',
    cursor: 'grab',
  },
  canvasWrapper: {
    flex: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  qrCodeDialog: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    textAlign: 'center',
  },
  alert: {
    position: 'fixed',
    heightL: '100px',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'green',
    color: 'white',
    padding: '1rem',
    borderRadius: '5px',
    zIndex: 2000,
    textAlign: 'center',
  },
  qrCode: {
    width: '150px',
    margin: '0 auto',
  },
};

export default CombinedComponent;
