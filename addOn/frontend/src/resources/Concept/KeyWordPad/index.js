import KeyWordPadCreate from "./KeyWordPadCreate";
import KeyWordPadEdit from './KeyWordPadEdit';
import KeyWordPadList from './KeyWordPadList';
import KeyWordPadShow from './KeyWordPadShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: KeyWordPadList,
    show: KeyWordPadShow,
    create: KeyWordPadCreate,
    edit: KeyWordPadEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Mots clés portail',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:KeyWordPad'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Mot clé portail |||| Mots clés portail',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:hasTopic': 'Thèmes'
      }
    }
  }
};
