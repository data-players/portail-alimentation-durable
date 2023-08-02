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
      label: 'Ressources',
    }
  },
  dataModel: {
    types: ['pair:Resource'],
    list: {
      servers: '@default',
      fetchContainer: true,
      forceArray: ['pair:hasTopic', 'pair:hasKeyword', 'pair:hasKeyWordPad', 'pair:hasDepartment']
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
        'pair:hasTopic': 'Thèmes',
        'pair:hasKeyword': "Mots clés",
        'pair:homePage' : "Lien de la ressource",
        'pair:hasDepartment' : "Départements",
        'pair:hasDataSource' : "Source de données",
        'pair:hasKeyWordPad' : "Mots clés du portail"
      }
    }
  }
};
