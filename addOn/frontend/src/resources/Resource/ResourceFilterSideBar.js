import React from 'react';
import { Grid, Card, CardContent, makeStyles, TextField } from '@material-ui/core';
import { ReferenceFilter } from '@semapps/list-components';
import { Form, Field } from 'react-final-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore } from 'react-redux';
import ReferenceFilterTree from './ReferenceFilterTree';
import ReferenceAutocompleteFilter from '../../common/field/ReferenceAutocompleteFilter';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: '15em',
      marginLeft: '1em'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  cardContent: {
    paddingTop: 0
  },
  searchBar: {
    padding: "10px",
    overflow: "visible",
    minWidth: "15%",
    [theme.breakpoints.down('xs')]: {
      minWidth: "25%",
    }
  },
}));

const FilterText = ({ input, ...otherProps }) => <TextField {...input} {...otherProps} />;

const ProjectFilterSidebar = () => {
  const classes = useStyles();
  const history = useHistory();

  const location = useLocation();
  const matches = location.pathname.match(/^\/([^/]+)/);
  const currentType = matches ? matches[1] : 'Organization';

  const store = useStore();
  const state = store.getState();
  const qFilter = state?.admin?.resources[location.pathname.split('/')[1]]?.list?.params?.filter?.q;

  const onSubmit = ({ filter, type }) => {
    if (filter) {
      history.push(`/${type}?filter=${encodeURIComponent(`{"q": "${filter}"}`)}`);
    } else {
      history.push(`/${type}?filter=${encodeURIComponent(`{}`)}`);
    }
  };

  return (
    <Card className={classes.searchBar}>
          <Form
      onSubmit={onSubmit}
      initialValues={{ type: currentType, filter: qFilter ? qFilter : '' }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field 
                name="filter" 
                component={FilterText} 
                placeholder="Rechercher..." 
                fullWidth />
            </Grid>
          </Grid>
        </form>
      )}
    />
      <CardContent className={classes.cardContent}>
        <ReferenceFilter
          reference="Keyword"
          source="pair:hasKeyword"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        /> 
        <ReferenceFilter
          reference="KeyWordPad"
          source="pair:hasKeyWordPad"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        /> 
        <ReferenceFilter
          reference="Datasource"
          source="pair:hasDataSource"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        /> 
        <ReferenceFilterTree
          reference="Theme"
          title="Thèmes"
          source="pair:broader"
          label="pair:label"
          predicate="http://virtual-assembly.org/ontologies/pair#hasTopic"
          limit={100}
          sort={{ field: 'pair:label', order: 'ASC' }}
        />
        <ReferenceAutocompleteFilter 
          optionText="pair:label" 
          resettable={true}  
          suggestionLimit={5}
          label="Département"
          reference="Department" 
          source="pair:hasDepartment"
          title="Départements"
        />
        
      </CardContent>
    </Card>
  );
};

export default ProjectFilterSidebar;
