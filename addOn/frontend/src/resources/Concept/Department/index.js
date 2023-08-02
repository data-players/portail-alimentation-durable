import DepartmentCreate from "./DepartmentCreate";
import DepartmentEdit from './DepartmentEdit';
import DepartmentList from './DepartmentList';
import DepartmentShow from './DepartmentShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: DepartmentList,
    show: DepartmentShow,
    create: DepartmentCreate,
    edit: DepartmentEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Départements',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:Department'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Département |||| Départements',
      fields: {
        'pair:label': 'Titre',
        'pair:region': "Région",
        'pair:departmentNb':'Numéro'
      }
    }
  }
};
