import { useState, useEffect } from 'react';
// import Header from './Header'; // Removed Header
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import TabNavigation from './TabNavigation';
import Modal from '../ui/Modal';
import BuyForm from '../ui/BuyForm';
import './Layout.css';
import { vehicles, getDefaultVehicle } from '../../data/vehiclesData';

// Screen breakpoints
const BREAKPOINTS = {
  MOBILE: 900 // теперь всё, что меньше 900 — мобильный режим
};

// Layout panels
const PANELS = {
  VIEWER: 'viewer',
  SELECTION: 'selection',
  SPECS: 'specs'
};

export default function Layout() {
  const [activePanel, setActivePanel] = useState(PANELS.VIEWER);
  const [screenSize, setScreenSize] = useState('desktop');
  const [selectedVehicle, setSelectedVehicle] = useState(getDefaultVehicle());
  const [isTestDriveActive, setIsTestDriveActive] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  
  // Determine screen size based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.MOBILE) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle keyboard events for test drive mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Exit test drive mode when 'c' key is pressed
      if (e.key.toLowerCase() === 'c' && isTestDriveActive) {
        setIsTestDriveActive(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTestDriveActive]);
  
  const handleStartTestDrive = () => {
    setIsTestDriveActive(true);
  };

  const handleBuySubmit = (formData) => {
    // Here you would typically send the form data to your backend
    console.log('Purchase form submitted:', { vehicle: selectedVehicle, ...formData });
    setIsBuyModalOpen(false);
    // You might want to show a success message or redirect the user
  };
  
  return (
    <div className={`layout layout-${screenSize} ${isTestDriveActive ? 'test-drive-active' : ''}`}>
      {/* <Header /> Removed Header */}

      {/* Test drive mode instruction */}
      {isTestDriveActive && (
        <div className="test-drive-instruction">
          Чтобы закончить тест драйв, нажмите [c]
        </div>
      )}

      {/* Mobile layout - one panel at a time with tabs */}
      {screenSize === 'mobile' && !isTestDriveActive && (
        <>
          <TabNavigation 
            activePanel={activePanel} 
            onSelectPanel={setActivePanel} 
          />
          <div className="panel-container">
            {activePanel === PANELS.VIEWER && (
              <ContentArea 
                type={PANELS.VIEWER} 
                selectedVehicle={selectedVehicle}
                testDriveActive={isTestDriveActive} 
              />
            )}
            {activePanel === PANELS.SELECTION && (
              <ContentArea type={PANELS.SELECTION} selectedVehicle={selectedVehicle} onSelectVehicle={setSelectedVehicle} vehicles={vehicles} />
            )}
            {activePanel === PANELS.SPECS && (
              <ContentArea 
                type={PANELS.SPECS} 
                selectedVehicle={selectedVehicle} 
                onStartTestDrive={handleStartTestDrive}
                onOpenBuyModal={() => setIsBuyModalOpen(true)}
              />
            )}
          </div>
        </>
      )}
      
      {/* Desktop layout - all panels visible or test drive mode */}
      {screenSize === 'desktop' && (
        <div className={`desktop-layout ${isTestDriveActive ? 'test-drive-layout' : ''}`}>
          {!isTestDriveActive && (
            <Sidebar type={PANELS.SELECTION} className="sidebar-left" selectedVehicle={selectedVehicle} onSelectVehicle={setSelectedVehicle} vehicles={vehicles} />
          )}
          <div className={`main-panel ${isTestDriveActive ? 'main-panel-fullscreen' : ''}`}>
            <ContentArea 
              type={PANELS.VIEWER} 
              selectedVehicle={selectedVehicle}
              testDriveActive={isTestDriveActive}  
            />
          </div>
          {!isTestDriveActive && (
            <Sidebar 
              type={PANELS.SPECS} 
              className="sidebar-right" 
              selectedVehicle={selectedVehicle} 
              onStartTestDrive={handleStartTestDrive}
              onOpenBuyModal={() => setIsBuyModalOpen(true)}
            />
          )}
        </div>
      )}

      {/* Mobile test drive mode - show only viewer */}
      {screenSize === 'mobile' && isTestDriveActive && (
        <div className="panel-container test-drive-panel">
          <ContentArea 
            type={PANELS.VIEWER} 
            selectedVehicle={selectedVehicle}
            testDriveActive={isTestDriveActive}  
          />
        </div>
      )}

      {/* Modal for buying vehicle - rendered at root level */}
      <Modal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        title={`Покупка ${selectedVehicle?.name || 'автомобиля'}`}
      >
        {(handleCloseWithAnimation) => (
          <BuyForm
            vehicle={selectedVehicle}
            onClose={handleCloseWithAnimation}
          />
        )}
      </Modal>
    </div>
  );
} 