export const environment = {
  production: true
};

// export const app = {
//   flag: 'pci',
//   BASE_URL: 'http://140.207.217.76/pci-operation/',
//   COMMON_URL: 'http://140.207.217.76/pro-health/'
// };
//
// export const app = {
//   flag: 'kidney',
//   BASE_URL: 'https://117.144.189.90/kidney-backend-test/',
//   CAN_URL: 'https://117.144.189.90/kidney-scheduler-test/',
//   COMMON_URL: 'https://140.207.217.76/pro-health/'
// };
export const app = {
  pci: {
    BASE_URL: 'http://140.207.217.76/pci-operation/',
    COMMON_URL: 'http://140.207.217.76/pro-health/',
    UPLOAD_URL: 'http://10.2.10.10/pci-operation/api/upload'
  },
  kidney: {
    BASE_URL: 'http://10.2.10.10:80/kidney-backend-test/',
    CAN_URL: 'http://10.2.10.10:80/kidney-scheduler-test/',
    COMMON_URL: 'http://10.2.10.10/pro-health/',
    UPLOAD_URL: 'http://10.2.10.10/pci-operation/api/upload'
  }
};
