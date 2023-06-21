import DatasourceCreate from "./DatasourceCreate";
import DatasourceEdit from './DatasourceEdit';
import DatasourceList from './DatasourceList';
import DatasourceShow from './DatasourceShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: DatasourceList,
    show: DatasourceShow,
    create: DatasourceCreate,
    edit: DatasourceEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Source de Donnée',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:Datasource'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Source de Donnée |||| Sources de Données',
      fields: {
        'pair:label': 'Titre',
        'pair:region': "Région",
        'pair:DatasourceNb':'Numéro'
      }
    }
  }
};
