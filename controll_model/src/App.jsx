// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SceneContainer from './components/Scene';

function App() {
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [isRotating, setIsRotating] = useState(false);
  const [zoomVal, setZoomVal] = useState(5);
  return (
    <Router>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SceneContainer
                  position={position}
                  rotation={rotation}
                  isRotating={isRotating}
                  zoomVal={zoomVal} 
                />
               
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
