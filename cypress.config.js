const { defineConfig } = require("cypress");
const cache = {
  id: {},
};
module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    viewportWidth: 1400,
    viewportHeight: 900,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 120000,
    requestTimeout: 7000,

    setupNodeEvents(on, config) {
      on("task", {
        putInCache: ({ key, data }) => {
          return (cache[key] = data);
        },
        getCache: (key) => cache[key],
      });
    },
  },
});
