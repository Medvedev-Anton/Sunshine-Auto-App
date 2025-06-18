import PropTypes from 'prop-types';
import './VehicleList.css';

export default function VehicleList({ vehicles, selectedVehicle, onSelectVehicle }) {
  return (
    <div className="vehicle-list-container">
      {vehicles && vehicles.map(vehicle => (
        <div
          key={vehicle.id}
          className={`vehicle-list-item${selectedVehicle?.id === vehicle.id ? ' selected' : ''}`}
          onClick={() => onSelectVehicle(vehicle)}
        >
          <div className="vehicle-list-name">{vehicle.name}</div>
          <div className="vehicle-list-price">{vehicle.price.toLocaleString()} $</div>
        </div>
      ))}
    </div>
  );
}

VehicleList.propTypes = {
  vehicles: PropTypes.array.isRequired,
  selectedVehicle: PropTypes.object,
  onSelectVehicle: PropTypes.func.isRequired
}; 