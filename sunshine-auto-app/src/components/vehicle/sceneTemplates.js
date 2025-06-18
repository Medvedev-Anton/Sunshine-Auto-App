// Scene templates for different vehicle presentation environments

// Default environment map path (will be replaced with actual HDR maps)
const DEFAULT_ENV_MAP = '/environment-maps/showroom.jpg';

export const sceneTemplates = {
  // Showroom environment - controlled indoor lighting with glossy floor
  showroom: {
    environment: {
      map: DEFAULT_ENV_MAP,
      exposure: 0.7
    },
    lighting: {
      main: {
        type: 'directional',
        position: [10, 10, 10],
        rotation: [45, -45, 0],
        color: '#ffffff',
        intensity: 2
      },
      fill: {
        type: 'directional',
        position: [-5, 3, -5],
        color: '#e0e0ff',
        intensity: 0.5
      },
      ambient: {
        color: '#ffffff',
        intensity: 0.4
      }
    },
    floor: {
      position: [0, -0.5, 0],
      size: [15, 15],
      material: 'glossy',
      reflectivity: 0.3
    },
    camera: {
      position: [5, 2, 5],
      fov: 45,
      minDistance: 3,
      maxDistance: 8,
      minPolarAngle: 0.1,
      maxPolarAngle: Math.PI / 2 - 0.1
    }
  },
  
  // Studio environment - clean neutral background with precision lighting
  studio: {
    environment: {
      map: DEFAULT_ENV_MAP,
      exposure: 0.5
    },
    lighting: {
      main: {
        type: 'directional',
        position: [5, 8, 5],
        rotation: [60, -30, 0],
        color: '#ffffff',
        intensity: 1.8
      },
      fill: {
        type: 'directional',
        position: [-3, 3, -3],
        color: '#f0f0ff',
        intensity: 0.7
      },
      ambient: {
        color: '#ffffff',
        intensity: 0.5
      }
    },
    floor: {
      position: [0, -0.5, 0],
      size: [12, 12],
      material: 'matte',
      reflectivity: 0.1
    },
    camera: {
      position: [4, 1.5, 4],
      fov: 40,
      minDistance: 3,
      maxDistance: 10,
      minPolarAngle: 0.05,
      maxPolarAngle: Math.PI / 2 - 0.05
    }
  },
  
  // Outdoor environment - natural lighting with ground texture
  outdoor: {
    environment: {
      map: DEFAULT_ENV_MAP,
      exposure: 1.0
    },
    lighting: {
      main: {
        type: 'directional',
        position: [15, 20, 15],
        rotation: [60, -45, 0],
        color: '#fffaf0',
        intensity: 2.5
      },
      fill: {
        type: 'directional',
        position: [-10, 5, -10],
        color: '#e6f0ff',
        intensity: 0.3
      },
      ambient: {
        color: '#c0d0ff',
        intensity: 0.6
      }
    },
    floor: {
      position: [0, -0.5, 0],
      size: [30, 30],
      material: 'asphalt',
      reflectivity: 0.05
    },
    camera: {
      position: [6, 2.5, 6],
      fov: 50,
      minDistance: 4,
      maxDistance: 15,
      minPolarAngle: 0.1,
      maxPolarAngle: Math.PI / 2 - 0.05
    }
  }
}; 