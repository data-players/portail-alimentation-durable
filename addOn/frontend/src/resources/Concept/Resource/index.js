import ResourceCreate from "./ResourceCreate";
import ResourceEdit from './ResourceEdit';
import ResourceList from './ResourceList';
import ResourceShow from './ResourceShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: ResourceList,
    show: ResourceShow,
    create: ResourceCreate,
    edit: ResourceEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Resources',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:Resource'],
    list: {
      servers: '@default',
      forceArray: ['pair:topicOf', "pair:keywordOf"]
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Resource ||| Resources',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de',
        'pair:keywordOf': "Mots clefs"
      }
    }
  }
};
