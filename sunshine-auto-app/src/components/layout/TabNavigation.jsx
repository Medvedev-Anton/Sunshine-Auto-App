import PropTypes from 'prop-types';
import './TabNavigation.css';

export default function TabNavigation({ 
  activePanel, 
  onSelectPanel, 
  vertical = false,
  excludeViewer = false 
}) {
  const tabs = [
    { id: 'viewer', label: '3D View', icon: '🔍' },
    { id: 'selection', label: 'Vehicles', icon: '🚗' },
    { id: 'specs', label: 'Specs', icon: '📋' }
  ].filter(tab => !excludeViewer || tab.id !== 'viewer');

  return (
    <div className={`tab-navigation ${vertical ? 'vertical' : 'horizontal'}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activePanel === tab.id ? 'active' : ''}`}
          onClick={() => onSelectPanel(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

TabNavigation.propTypes = {
  activePanel: PropTypes.string.isRequired,
  onSelectPanel: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  excludeViewer: PropTypes.bool
}; 