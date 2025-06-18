import { useState, useEffect } from 'react';
import './VehicleSpecs.css';
import { getDefaultVehicle } from '../../data/vehiclesData';
import Slider from '../ui/Slider';
import PropTypes from 'prop-types';

export default function VehicleSpecs({ selectedVehicle, onStartTestDrive, onOpenBuyModal }) {
  const vehicleToDisplay = selectedVehicle;
  const [specs, setSpecs] = useState(vehicleToDisplay?.specs);

  useEffect(() => {
    setSpecs(vehicleToDisplay?.specs);
  }, [vehicleToDisplay]);

  if (!vehicleToDisplay || !specs) {
    return <div className="vehicle-specs-empty">Нет данных об автомобиле.</div>;
  }

  const handleSpecChange = (specName, value) => {
    setSpecs(prevSpecs => ({
      ...prevSpecs,
      [specName]: value
    }));
  };

  const { name, price } = vehicleToDisplay;

  // Format price for display
  const formatPrice = (num) => {
    return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  };

  return (
    <div className="vehicle-specs-container">
      <div className="specs-vehicle-name">{name}</div>
      
      <div className="stats-group">
        <Slider label="Скорость" value={specs.speed} onChange={(val) => handleSpecChange('speed', val)} />
        <Slider label="Ускорение" value={specs.acceleration} onChange={(val) => handleSpecChange('acceleration', val)} />
        <Slider label="Торможение" value={specs.braking} onChange={(val) => handleSpecChange('braking', val)} />
        <Slider label="Управление" value={specs.handling} onChange={(val) => handleSpecChange('handling', val)} />
      </div>

      <div className="fuel-info">
        <div className="fuel-icon-placeholder">⛽</div> {/* Placeholder for fuel pump icon */}
        <div className="fuel-text">
          <span className="fuel-label">Объем бака</span>
          <span className="fuel-value">{specs.fuel_tank_capacity} л</span>
        </div>
      </div>

      <div className="price-section">
        <div className="price-label">Стоимость автомобиля</div>
        <div className="price-value">{formatPrice(price)}</div>
      </div>

      <button className="test-drive-button" onClick={onStartTestDrive}>ТЕСТ-ДРАЙВ</button>
      <button className="buy-button" onClick={onOpenBuyModal}>КУПИТЬ</button>
    </div>
  );
}

VehicleSpecs.propTypes = {
  selectedVehicle: PropTypes.object,
  onStartTestDrive: PropTypes.func,
  onOpenBuyModal: PropTypes.func
};