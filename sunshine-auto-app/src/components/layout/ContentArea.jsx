import PropTypes from 'prop-types';
import './ContentArea.css';
import VehicleViewer from '../vehicle/VehicleViewer';
import VehicleSpecs from '../vehicle/VehicleSpecs';
import { getDefaultVehicle } from '../../data/vehiclesData';
import VehicleList from '../vehicle/VehicleList';

export default function ContentArea({ type, selectedVehicle, onSelectVehicle, vehicles, onStartTestDrive, testDriveActive, onOpenBuyModal }) {
  return (
    <div className={`content-area content-${type} ${testDriveActive ? 'in-test-drive' : ''}`}>
      {type === 'viewer' && (
        <VehicleViewer 
          vehicleModel={selectedVehicle} 
          templateName={selectedVehicle?.type === 'suv' ? 'outdoor' : 'showroom'} 
          testDriveActive={testDriveActive}
        />
      )}
      {type === 'specs' && (
        <VehicleSpecs 
          selectedVehicle={selectedVehicle} 
          onStartTestDrive={onStartTestDrive}
          onOpenBuyModal={onOpenBuyModal}
        />
      )}
      {type === 'selection' && (
        <VehicleList vehicles={vehicles} selectedVehicle={selectedVehicle} onSelectVehicle={onSelectVehicle} />
      )}
    </div>
  );
}

ContentArea.propTypes = {
  type: PropTypes.oneOf(['viewer', 'selection', 'specs']).isRequired,
  selectedVehicle: PropTypes.object,
  onSelectVehicle: PropTypes.func,
  vehicles: PropTypes.array,
  onStartTestDrive: PropTypes.func,
  testDriveActive: PropTypes.bool,
  onOpenBuyModal: PropTypes.func
}; 