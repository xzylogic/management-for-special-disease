// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true
};

export const app = {
  pci: {
    BASE_URL: 'https://test-cloud.medicine-tec.cn/pci-operation/',
    COMMON_URL: 'https://test-cloud.medicine-tec.cn/pro-health/',
    UPLOAD_URL: 'https://test-cloud.medicine-tec.cn/pci-operation/api/upload'
  },
  kidney: {
    BASE_URL: 'https://test-cloud.medicine-tec.cn/kidney-backend-test/',
    CAN_URL: 'https://test-cloud.medicine-tec.cn/kidney-scheduler-test/',
    COMMON_URL: 'https://test-cloud.medicine-tec.cn/pro-health/',
    UPLOAD_URL: 'https://test-cloud.medicine-tec.cn/pci-operation/api/upload'
  }
};
