import KeywordCreate from "./KeywordCreate";
import KeywordEdit from './KeywordEdit';
import KeywordList from './KeywordList';
import KeywordShow from './KeywordShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: KeywordList,
    show: KeywordShow,
    create: KeywordCreate,
    edit: KeywordEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Mots Clefs',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:Keyword'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Mot Clef |||| Mots Clefs',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
