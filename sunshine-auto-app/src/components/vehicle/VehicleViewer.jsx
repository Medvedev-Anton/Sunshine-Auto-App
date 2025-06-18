import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Application, Entity } from '@playcanvas/react';
import { Camera, Light, Render, Script } from '@playcanvas/react/components';
import { OrbitControls } from '@playcanvas/react/scripts';
import './VehicleViewer.css';
import { sceneTemplates } from './sceneTemplates';
import { availableColors } from './colors';
import { ModelViewer } from './ModelViewer.tsx';
import { RoomStage } from './RoomStage';
import { StaticPostEffects } from './StaticPostEffects';
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { useRef } from 'react';
import VehicleControl from './scripts/vehicle';

const SceneContent = ({ template, selectedColor, modelUrl, position, scale, rotation }) => {
  return (
    <>
      {/* Vehicle model */}
      <Entity 
        key={modelUrl}
        name="vehicle" 
        position={position || [0, 0.5, 0]}
        rotation={rotation || [0, 0, 0]}
        scale={scale || [3, 3, 3]}
      >
        <ModelViewer src={modelUrl} color={selectedColor} />
      </Entity>
      {/* Camera setup */}
      <Entity 
        name="cameraRig" 
        position={template.camera.position}
      >
        <Camera fov={template.camera.fov} />
        <StaticPostEffects />
        <OrbitControls 
          maxDistance={template.camera.maxDistance}
          minDistance={template.camera.minDistance}
          maxPolarAngle={template.camera.maxPolarAngle}
          minPolarAngle={template.camera.minPolarAngle}
        />
      </Entity>
    </>
  );
};

SceneContent.propTypes = {
  template: PropTypes.object.isRequired,
  selectedColor: PropTypes.array,
  modelUrl: PropTypes.string.isRequired,
  position: PropTypes.array,
  scale: PropTypes.array,
  rotation: PropTypes.array
};

export default function VehicleViewer({ 
  vehicleModel,
  templateName = 'showroom',
  testDriveActive = false
}) {
  const [template, setTemplate] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(availableColors.find(c => c.isDefault)?.id || availableColors[0]?.id);
  const [selectedColor, setSelectedColor] = useState([1, 1, 1]);
  const entityRef = useRef(null);

  // Load selected template
  useEffect(() => {
    if (sceneTemplates[templateName]) {
      setTemplate(sceneTemplates[templateName]);
    } else {
      console.error(`Template "${templateName}" not found, falling back to showroom`);
      setTemplate(sceneTemplates.showroom);
    }
  }, [templateName]);

  if (!template || !vehicleModel) {
    return <div className="viewer-error">Failed to load scene template.</div>;
  }

  const handleColorSelect = (colorId) => {
    setSelectedColorId(colorId);
    const selectedColorOption = availableColors.find(c => c.id === colorId);
    if (!selectedColorOption) {
      console.warn("Selected color not found.");
      return;
    }
    // Convert hex to RGB array
    const hex = selectedColorOption.hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    setSelectedColor([r, g, b]);
  };

  return (
    <div className={`vehicle-viewer-container ${testDriveActive ? 'test-drive-active' : ''}`}>
      <Application className={`vehicle-viewer-canvas ${testDriveActive ? 'fullscreen-canvas' : ''}`}>
        <RoomStage />
        {testDriveActive ? (
          <Entity position={[0, 5, -10]}>
            <Camera fov={60} clearColor="#161311" />
            <Script script={class {
              initialize() {
                this.target = null;
              }
              update() {
                if (this.target) {
                  const targetPos = this.target.getPosition();
                  this.entity.setPosition(targetPos.x, targetPos.y + 5, targetPos.z - 10);
                  this.entity.lookAt(targetPos);
                }
              }
            }} />
          </Entity>
        ) : (
          <Entity position={template.camera.position}>
            <Camera fov={template.camera.fov} clearColor="#161311" />
            <StaticPostEffects />
            <OrbitControls 
              maxDistance={template.camera.maxDistance}
              minDistance={template.camera.minDistance}
              maxPolarAngle={template.camera.maxPolarAngle}
              minPolarAngle={template.camera.minPolarAngle}
            />
          </Entity>
        )}
        
        <Entity 
          key={vehicleModel.modelUrl}
          ref={entityRef} 
          position={vehicleModel.position || [0, 0.5, 0]} 
          rotation={vehicleModel.rotation || [0, 0, 0]} 
          scale={vehicleModel.scale || [3, 3, 3]}>
          <ModelViewer src={vehicleModel.modelUrl} color={selectedColor} />
          {testDriveActive && <Script script={VehicleControl} />}
        </Entity>
      </Application>
      {!testDriveActive && (
        <div className="color-palette-container">
          <div className="color-palette-label">Выберите цвет</div>
          <div className="color-palette">
            {availableColors.map(color => (
              <button 
                key={color.id} 
                className={`color-swatch ${selectedColorId === color.id ? 'active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorSelect(color.id)}
                aria-label={`Select color ${color.id}`}
              />
            ))}
          </div>
        </div>
      )}
      {testDriveActive && (
        <div className="test-drive-controls">
          <div className="control-info">
            <p>Управление:</p>
            <p>S - газ</p>
            <p>W - тормоз</p>
            <p>A - влево</p>
            <p>D - вправо</p>
          </div>
        </div>
      )}
    </div>
  );
}

VehicleViewer.propTypes = {
  vehicleModel: PropTypes.object,
  templateName: PropTypes.oneOf(['showroom', 'studio', 'outdoor']),
  testDriveActive: PropTypes.bool
}; 