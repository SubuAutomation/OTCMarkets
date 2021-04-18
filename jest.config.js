module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  runner: 'jest-serial-runner',
  //repoters:[  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  //reporters: ["default", "jest-allure"]
  reporters: [
    ['jest-html-reporters',
    {
      "filename": "./TestReport/TestReport.html",
      "expand": true
    }]
  ]
};
