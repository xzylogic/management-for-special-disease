export const environment = {
  production: true
};

export const app = {
  pci: {
    BASE_URL: 'http://10.2.10.10/pci-operation/',
    COMMON_URL: 'http://10.2.10.10/pro-health/'
  },
  kidney: {
    BASE_URL: 'http://10.2.10.10:80/kidney-backend-test/',
    CAN_URL: 'http://10.2.10.10:80/kidney-scheduler-test/',
    COMMON_URL: 'http://10.2.10.10/pro-health/'
  }
};
