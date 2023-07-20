const CONFIG = require('./config');
const { ACTOR_TYPES } = require("@semapps/activitypub");

module.exports = [
  {
    path: '/'
  },
  {
    path: '/users',
    preferredView: '/Person',
    acceptedTypes: ['pair:Person'],
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress']
  },
  {
    path: '/bots',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey'],
    excludeFromMirror: true
  },
  {
    path: '/themes',
    preferredView: '/Theme',
    acceptedTypes: ['pair:Theme']
  },
  {
    path: '/departments',
    preferredView: '/Department',
    acceptedTypes: ['pair:Department']
  },
  {
    path: '/datasources',
    preferredView: '/Datasource',
    acceptedTypes: ['pair:Datasource']
  },
  {
    path: '/keywords',
    preferredView: '/Keyword',
    acceptedTypes: ['pair:Keyword']
  },
  {
    path: '/keywordpads',
    preferredView: '/KeyWordPad',
    acceptedTypes: ['pair:KeyWordPad']
  },
  {
    path: '/pages',
    preferredView: '/Page',
    acceptedTypes: ['semapps:Page']
  },
  {
    path: '/resources',
    preferredView: '/Resource',
    acceptedTypes: ['pair:Resource']
  }
];
