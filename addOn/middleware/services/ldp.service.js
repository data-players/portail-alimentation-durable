const { LdpService, DocumentTaggerMixin } = require('@semapps/ldp');
const urlJoin = require('url-join');
const CONFIG = require('../config/config');
const containers = require('../config/containers');
const {defaultOntologies} = require('@semapps/core')

async function getRessourceLabelsStringByURI(uri, ctx) {
    if (Array.isArray(uri)) {
        const promises = uri.map(async e => 
            await ctx.call('ldp.resource.get', {
                resourceUri: e,
                accept: 'application/ld+json',
                webId: 'system'
            })
        );
        return Promise.all(promises);
    } else {
        return await ctx.call('ldp.resource.get', {
            resourceUri: uri,
            accept: 'application/ld+json',
            webId: 'system'
        });
    }
}

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
                    if (resource["pair:hasDataSource"]) {
                        var source = await getRessourceLabelsStringByURI(resource["pair:hasDataSource"], ctx)
                    } else { source = "";}

                    if (resource["pair:hasTopic"]) {
                        var topic = await getRessourceLabelsStringByURI(resource["pair:hasTopic"], ctx)
                        if (Array.isArray(topic)) { topic = topic.map(obj => obj['pair:label']).toString();
                        } else { topic = topic["pai:label"];}
                    } else { topic = "";}

                    if (resource["pair:hasDepartment"]) {
                        var department = await getRessourceLabelsStringByURI(resource["pair:hasDepartment"], ctx)
                        if (Array.isArray(department)) { department = department.map(obj => obj['pair:label']).toString();
                        } else { department = department["pai:label"]; }
                    } else { department = "";}

                    if (resource["pair:hasKeyword"]) {
                        var keyword = await getRessourceLabelsStringByURI(resource["pair:hasKeyword"], ctx)
                        if (Array.isArray(keyword)) { keyword = keyword.map(obj => obj['pair:label']).toString();
                        } else { keyword = keyword["pai:label"]; }
                    } else { keyword = "";}

                    if (resource["pair:hasKeyWordPad"]) {
                        var keywordpad = await getRessourceLabelsStringByURI(resource["pair:hasKeyWordPad"], ctx)
                        if (Array.isArray(keywordpad)) { keywordpad = keywordpad.map(obj => obj['pair:label']).toString();
                        } else { keywordpad = keywordpad["pai:label"]; }
                    } else { keywordpad = "";}

                    ctx.params.resource = {...resource, "pair:search": source["pair:label"]+" "+topic+" "+keyword+" "+keywordpad+" "+department};
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
                        if (resource["pair:hasDataSource"]) {
                            var source = await getRessourceLabelsStringByURI(resource["pair:hasDataSource"], ctx)
                        } else { source = "";}

                        if (resource["pair:hasTopic"]) {
                            var topic = await getRessourceLabelsStringByURI(resource["pair:hasTopic"], ctx)
                            if (Array.isArray(topic)) { topic = topic.map(obj => obj['pair:label']).toString();
                            } else { topic = topic["pai:label"];}
                        } else { topic = "";}

                        if (resource["pair:hasDepartment"]) {
                            var department = await getRessourceLabelsStringByURI(resource["pair:hasDepartment"], ctx)
                            if (Array.isArray(department)) { department = department.map(obj => obj['pair:label']).toString();
                            } else { department = department["pai:label"]; }
                        } else { department = "";}

                        if (resource["pair:hasKeyword"]) {
                            var keyword = await getRessourceLabelsStringByURI(resource["pair:hasKeyword"], ctx)
                            if (Array.isArray(keyword)) { keyword = keyword.map(obj => obj['pair:label']).toString();
                            } else { keyword = keyword["pai:label"]; }
                        } else { keyword = "";}

                        if (resource["pair:hasKeyWordPad"]) {
                            var keywordpad = await getRessourceLabelsStringByURI(resource["pair:hasKeyWordPad"], ctx)
                            if (Array.isArray(keywordpad)) { keywordpad = keywordpad.map(obj => obj['pair:label']).toString();
                            } else { keywordpad = keywordpad["pai:label"]; }
                        } else { keywordpad = "";}

                        ctx.params.resource = {...resource, "pair:search": source["pair:label"]+" "+topic+" "+keyword+" "+keywordpad+" "+department};
                    break;

                default:
                  break;
              }
              return res
            }
        },
    }
};