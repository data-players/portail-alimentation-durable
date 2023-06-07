import ResourceCreate from "./ResourceCreate";
import ResourceEdit from './ResourceEdit';
import ResourceList from './ResourceList';
import ResourceShow from './ResourceShow';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default {
  config: {
    list: ResourceList,
    show: ResourceShow,
    create: ResourceCreate,
    edit: ResourceEdit,
    icon: FolderOpenIcon,
    options: {
      label: 'Ressource',
    }
  },
  dataModel: {
    types: ['pair:Resource'],
    list: {
      servers: '@default',
      forceArray: ['pair:hasTopic', 'pair:hasKeyword']
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Ressource |||| Ressources',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:hasTopic': 'Sujet de',
        'pair:hasKeyword': "Mots clefs",
        'pair:homePage' : "Lien de la ressource"
      }
    }
  }
};
