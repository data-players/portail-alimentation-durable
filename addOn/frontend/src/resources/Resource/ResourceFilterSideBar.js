import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { ReferenceFilter } from '@semapps/list-components';
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

const ProjectFilterSidebar = () => {
  const classes = useStyles();

  return (
    <Card className={classes.searchBar}>
      <CardContent className={classes.cardContent}>
        <ReferenceFilter
          reference="Keyword"
          source="pair:hasKeyword"
          limit={100}
          showCounters={false}
          sort={{ field: 'pair:label', order: 'DESC' }}
        /> 
        <ReferenceFilter
          reference="Datasource"
          source="pair:hasDatasource"
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
        />
        
      </CardContent>
    </Card>
  );
};

export default ProjectFilterSidebar;
