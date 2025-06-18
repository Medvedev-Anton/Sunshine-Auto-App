export const vehicles = [
  {
    id: 'bmw-m8-coupe',
    name: 'BMW M8 Coupe',
    price: 89990,
    type: 'sports',
    modelUrl: '/Sunshine-Auto-App/assets/models/2020-bmw-m8-coupe/source/2020_bmw_m8_coupe.glb',
    position: [0, 0, 0],
    scale: [250, 250, 250],
    rotation: [0, 0, 0],
    specs: {
      speed: 85,
      maxSpeedLabel: '250 км/ч',
      acceleration: 90,
      braking: 88,
      handling: 82,
      fuel_tank_capacity: 100
    }
  },
  {
    id: 'mercedes-benz-g-class-amg-g63',
    name: 'Mercedes-Benz G-Class AMG G63',
    price: 92990,
    type: 'suv',
    modelUrl: '/Sunshine-Auto-App/assets/models/2020-mercedes-benz-g-class-amg-g63/source/2020_mercedes-benz_g-class_amg_g_63.glb',
    position: [0, 0, 0],
    scale: [250, 250, 250],
    rotation: [0, 0, 0],
    specs: {
      speed: 80,
      maxSpeedLabel: '240 км/ч',
      acceleration: 85,
      braking: 92,
      handling: 88,
      fuel_tank_capacity: 75
    }
  },
  {
    id: 'ram-1500-trx',
    name: 'RAM 1500 TRX',
    price: 115990,
    type: 'suv',
    modelUrl: '/Sunshine-Auto-App/assets/models/2021-ram-1500-trx/source/2021_ram_1500_trx.glb',
    position: [0, 0, 0],
    scale: [250, 250, 250],
    rotation: [0, 0, 0],
    specs: {
      speed: 95,
      maxSpeedLabel: '290 км/ч',
      acceleration: 95,
      braking: 95,
      handling: 95,
      fuel_tank_capacity: 64
    }
  },
  {
    id: 'lamborghini-urus-performante',
    name: 'Lamborgini Urus Performante',
    price: 156990,
    type: 'sedan',
    modelUrl: '/Sunshine-Auto-App/assets/models/2023-lamborghini-urus-performante/source/2023_lamborghini_urus_performante.glb',
    position: [0, 0, 0],
    scale: [250, 250, 250],
    rotation: [0, 0, 0],
    specs: {
      speed: 65,
      maxSpeedLabel: '190 км/ч',
      acceleration: 82,
      braking: 85,
      handling: 78,
      fuel_tank_capacity: 96
    }
  },
  {
    id: 'porsche-718',
    name: 'Porsche 718 Cayman GTS',
    price: 85000,
    type: 'sports',
    modelUrl: '/Sunshine-Auto-App/assets/models/2018-porsche-718-cayman-gts/source/2018_porsche_718_cayman_gts.glb',
    position: [0, 0, 0],
    scale: [250, 250, 250],
    rotation: [0, 0, 0],
    specs: {
      speed: 90,
      maxSpeedLabel: '285 км/ч',
      acceleration: 92,
      braking: 90,
      handling: 93,
      fuel_tank_capacity: 54
    }
  },
  {
    id: 'nissan-r35',
    name: 'Nissan Skyline R35',
    price: 78000,
    type: 'sports',
    modelUrl: '/Sunshine-Auto-App/assets/models/Nissan_skyline_r35/source/nissan_skyline_r35_gtr_nismo__free.glb',
    position: [0, 0, 0],
    scale: [3, 3, 3],
    rotation: [0, 0, 0],
    specs: {
      speed: 88,
      maxSpeedLabel: '315 км/ч',
      acceleration: 95,
      braking: 87,
      handling: 90,
      fuel_tank_capacity: 74
    }
  }
];

export const getDefaultVehicle = () => vehicles[0]; 