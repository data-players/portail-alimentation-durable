const { LdpService, DocumentTaggerMixin } = require('@semapps/ldp');
const urlJoin = require('url-join');
const CONFIG = require('../config/config');
const containers = require('../config/containers');
const {defaultOntologies} = require('@semapps/core')

module.exports = {
    mixins: [LdpService, DocumentTaggerMixin],
    settings: {
        baseUrl: CONFIG.HOME_URL,
        ontologies: defaultOntologies,
        containers,
        preferredViewForResource: async (resourceUri, containerPreferredView) => {
            if (!containerPreferredView) return resourceUri;
            return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
        },
        defaultContainerOptions: {
            jsonContext: urlJoin('https://data.portail-alimentation-durable.data-players.com/','context.json'),
        }
    },
    hooksContainer: {
        before: {
            "post":async (ctx, res)=>{
              // console.log('HOOK GET');
              // console.log('BEFORE POST',ctx.params);
              const resource = ctx.params.resource;
              // console.log('POST',resource);              
              const container = await ctx.call('ldp.registry.getByUri', { containerUri : ctx.params.containerUri})
              // console.log('container',container)
              switch (container.path) {
                case '/resources':
                    ctx.params.resource = {...resource, "pair:search":"coucou"};
                    break;

                default:
                  break;
              }

              return res
            }
        },
    },
    hooksResource: {
        before: {
            "put":async (ctx, res)=>{
              // console.log('HOOK GET');
              // console.log('BEFORE POST',ctx.params);
              const resource = ctx.params.resource;
              // console.log('POST',resource);              
              const container = await ctx.call('ldp.registry.getByUri', { containerUri : ctx.params.containerUri})
              // console.log('container',container)
              switch (container.path) {
                case '/resources':
                    const topicStr = Array.isArray(resource["pair:hasTopic"]) ? resource["pair:hasTopic"].toString() : resource["pair:hasTopic"];
                    const keywordStr = Array.isArray(resource["pair:hasKeyword"]) ? resource["pair:hasKeyword"].toString() : resource["pair:hasKeyword"];
                    const departmentStr = Array.isArray(resource["pair:hasDepartment"]) ? resource["pair:hasDepartment"].toString() : resource["pair:hasDepartment"];
                    const sourceStr = Array.isArray(resource["pair:hasDatasource"]) ? resource["pair:hasDatasource"].toString() : resource["pair:hasDatasource"];;
                    
                    const { controlledActions } = await ctx.call('ldp.resources.get', {
                        resourceUri: sourceStr
                    });
                    console.log("controlledActions:", controlledActions)

                    ctx.params.resource = {...resource, "pair:search": topicStr + " - " + keywordStr + " - " + departmentStr + " - " + sourceStr};
                    break;

                default:
                  break;
              }
              return res
            }
        },
    }
};