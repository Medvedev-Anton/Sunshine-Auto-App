import PropTypes from 'prop-types';
import './Sidebar.css';
import ContentArea from './ContentArea';

export default function Sidebar({ type, className, selectedVehicle, onSelectVehicle, vehicles, onStartTestDrive, onOpenBuyModal }) {
  const isCollapsible = false; // For now, let's assume not collapsible based on image
  
  return (
    <div className={`sidebar sidebar-${type} ${isCollapsible ? 'collapsible' : ''} ${className || ''}`}>
      <div className="sidebar-header">
        {type === 'selection' && (
          <>
            <h1 className="sidebar-main-title">Автосалон</h1>
            <h2 className="sidebar-subtitle">Комфорт</h2>
          </>
        )}
        {type === 'specs' && (
          <h2 className="sidebar-title visually-hidden">Specifications</h2>
        )}
        {isCollapsible && (
          <button className="collapse-button" aria-label="Toggle panel">
            <span className="collapse-icon">›</span>
          </button>
        )}
      </div>
      <div className="sidebar-content">
        <ContentArea 
          type={type} 
          selectedVehicle={selectedVehicle} 
          onSelectVehicle={onSelectVehicle} 
          vehicles={vehicles}
          onStartTestDrive={onStartTestDrive}
          onOpenBuyModal={onOpenBuyModal}
        />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  type: PropTypes.oneOf(['selection', 'specs']).isRequired,
  className: PropTypes.string,
  selectedVehicle: PropTypes.object,
  onSelectVehicle: PropTypes.func,
  vehicles: PropTypes.array,
  onStartTestDrive: PropTypes.func,
  onOpenBuyModal: PropTypes.func
}; 