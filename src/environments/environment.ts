// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export const app = {
  pci: {
    BASE_URL: 'https://pci.violetqqy.com/pci-operation/',
    COMMON_URL: 'https://pci.violetqqy.com/pro-health/',
    UPLOAD_URL: 'https://pci.violetqqy.com/pci-operation/api/upload'
  },
  kidney: {
    BASE_URL: 'https://pci.violetqqy.com/kidney-backend-test/',
    CAN_URL: 'https://pci.violetqqy.com/kidney-scheduler-test/',
    COMMON_URL: 'https://pci.violetqqy.com/pro-health/',
    UPLOAD_URL: 'https://pci.violetqqy.com/pci-operation/api/upload'
  }
};
