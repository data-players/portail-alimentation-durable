const path = require('path');
const urlJoin = require("url-join");
const { CoreService } = require('@semapps/core');
const CONFIG = require('../config/config');
const containers = require('../config/containers');

module.exports = {
  mixins: [CoreService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    baseDir: path.resolve(__dirname, '..'),
    // jsonContext: urlJoin('https://data.portail-alimentation-durable.data-players.com/context.json'),
    triplestore: {
      url: CONFIG.SPARQL_ENDPOINT,
      user: CONFIG.JENA_USER,
      password: CONFIG.JENA_PASSWORD,
      mainDataset: CONFIG.MAIN_DATASET,
    },
    containers,
    api: {
      port: CONFIG.PORT,
    },
    ldp: {
      preferredViewForResource: async (resourceUri, containerPreferredView) => {
        if (!containerPreferredView) return resourceUri;
        return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
      }
    },
    void: {
      title: CONFIG.INSTANCE_NAME,
      description: CONFIG.INSTANCE_DESCRIPTION
    },
    webacl: {
      superAdmins: [
      'http://localhost:3000/users/simon.louvet.zen',
      'http://localhost:3000/users/bastien.siguier',
      'https://data.petr-peps.data-players.com/users/simon.louvet.zen',
      'https://data.petr-peps.data-players.com/users/bastien.siguier1',
    ]
    }
  }
};
