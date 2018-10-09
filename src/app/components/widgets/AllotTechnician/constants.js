const CONSTANTS = {
  ui: {
    primaryColor: 'rgb(55, 150, 198)',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  serverUrl: 'http://localhost:8080',
  api: {
    getTechnicianShifts: '/api/get/technician',
    allotTechnicianShifts: '/api/post/technician',
    saveTechnicianShifts: '/api/put/technician',
    deleteTechnicianShifts: '/api/delete/technician',
  },
  employeeList: {
    1: {
      name: 'Eli',
      image:" https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png", 
      shift: '',
      station: '',
      lead: true,
    },
    2: {
      name: 'Leo',
      image: " https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      shift: '',
      station: '',
      lead: true,
      
    },
    3: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Max',
      shift: '',
      station: '',
      lead: true,
    },
    4: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Kai',
      shift: '',
      station: '',
      lead: true,
    },
    5: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Jax',
      shift: '',
      station: '',
    },
    6: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Roy',
      shift: '',
      station: '',
     // lead: true,
    },
    7: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Kye',
      shift: '',
      station: '',
    },
    8: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Fox',
      shift: '',
      station: '',
    },
    9: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Sam',
      shift: '',
      station: '',
    },
    10: {
      image:"https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Ben',
      shift: '',
      station: '',
   //   lead: true,
    },
    11: {
      image:"https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Axl',
      shift: '',
      station: '',
  //    lead: true,
    },
    12: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Ira',
      shift: '',
      station: '',
    //  lead: true,
    },
    13: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Jad',
      shift: '',
      station: '',
    //  lead: true,
    },
    14: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'Gus',
      shift: '',
      station: '',
    //  lead: true,
    },
    15: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'SOH',
      shift: '',
      station: '',
     // lead: true,
    },
    16: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'CAS',
      shift: '',
      station: '',
    //  lead: true,
    },
    17: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'OSH',
      shift: '',
      station: '',
    //  lead: true,
    },
    15: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'CAM',
      shift: '',
      station: '',
    //  lead: true,
    },
    18: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'DOL',
      shift: '',
      station: '',
    //  lead: true,
    },
    19: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'PRE',
      shift: '',
      station: '',
    //  lead: true,
    },
    20: {
      image: "https://cdn2.iconfinder.com/data/icons/solid-glyphs-volume-2/256/user-unisex-512.png",
      name: 'OHO',
      shift: '',
      station: '',
    //  lead: true,
    },
  },
  stationList: {
    '1': {
      id: '1',
      name: 'Station 1',
      
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
        //'3': { id: '3', name: 'Shift 3' },
        //'4': { id: '4', name: 'Shift 4' },
      },
    },
    '2': {
      id: '2',
      name: 'Station 2',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
        //'4': { id: '4', name: 'Shift 4' },
      },
    },
    '3': {
      id: '3',
      name: 'Station 3',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '4': {
      id: '4',
      name: 'Station 4',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '5': {
      id: '5',
      name: 'Station 5',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '6': {
      id: '6',
      name: 'Station 6',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '7': {
      id: '7',
      name: 'Station 7',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '8': {
      id: '8',
      name: 'Station 8',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },

  },
};

export default CONSTANTS;