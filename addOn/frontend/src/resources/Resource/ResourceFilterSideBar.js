import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { ReferenceFilter } from '@semapps/list-components';
import { useForm, FormProvider } from 'react-hook-form';
import ReferenceFilterTree from './ReferenceFilterTree';
import { Box, InputAdornment } from '@mui/material';
import ReferenceAutocompleteFilter from '../../common/field/ReferenceAutocompleteFilter';
import { Button, TextInput, useListContext } from 'react-admin';
import SearchIcon from '@mui/icons-material/Search';

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

const Card = withStyles(theme => ({
  root: {
      [theme.breakpoints.up('sm')]: {
          order: -1, // display on the left rather than on the right of the list
          width: '15em',
          marginRight: '1em',
      },
      [theme.breakpoints.down('sm')]: {
          display: 'none',
      },
  },
}))(MuiCard);


const ResourceFilterSideBar = () => {
  const classes = useStyles();

  const {
    displayedFilters,
    filterValues,
    setFilters,
    hideFilter
  } = useListContext();

  const form = useForm({
      defaultValues: filterValues,
  });

//   if (!displayedFilters.main) return null;

  const onSubmit = (values) => {
      if (Object.keys(values).length > 0) {
          setFilters(values);
      } else {
          hideFilter("main");
      }
  };

  const resetFilter = () => {
      setFilters({}, []);
  };

  const RemoveFilterButton = (props) => {
    return(
      <Button onClick={resetFilter} >Supprimer les filtres</Button>
    )
  }

  return (
    <Card className={classes.searchBar}>
      
      <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
              <Box display="flex" alignItems="flex-end" mb={1}>
                  <Box component="span" mr={2}>
                      {/* Full-text search filter. We don't use <SearchFilter> to force a large form input */}
                      <TextInput
                          resettable
                          helperText={false}
                          source="q"
                          label="Search"
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment>
                                      <SearchIcon color="disabled" />
                                  </InputAdornment>
                              )
                          }}
                      />
                  </Box>
              </Box>
          </form>
      </FormProvider>

      <CardContent className={classes.cardContent}>
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
          reference="Keyword"
          source="pair:hasKeyword"
          label="Mots clés"
          optionText="pair:label" 
          resettable={true}  
          suggestionLimit={5}
        /> 
        <ReferenceAutocompleteFilter
          reference="KeyWordPad"
          source="pair:hasKeyWordPad"
          label="Mots clés portail"
          optionText="pair:label" 
          resettable={true}  
          suggestionLimit={5}
        /> 
        <ReferenceAutocompleteFilter 
          optionText="pair:label" 
          resettable={true}  
          suggestionLimit={5}
          label="Département"
          reference="Department" 
          source="pair:hasDepartment"
        />
        <RemoveFilterButton />
      </CardContent>
    </Card>
  );
};

export default ResourceFilterSideBar;
