import React from "react";
import { useListFilterContext } from 'ra-core';
import { Grid } from '@material-ui/core';
import { Form } from 'react-final-form';
import { AutocompleteInput, ReferenceInput } from 'react-admin';

const ReferenceAutocompleteFilter = (props) => {    
    const { filterValues, setFilters } = useListFilterContext();

    const onChange = (choice) => {
        setFilters({...filterValues, "pair:hasDepartment": choice});
    }

    return (
        <Form
            onSubmit={() => {}}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid style={{marginTop: "5px"}} container spacing={2}>
                        <Grid item xs={12}>
                            <ReferenceInput onChange={onChange} {...props} >
                                <AutocompleteInput {...props} />
                            </ReferenceInput>      
                        </Grid>
                    </Grid>
                </form>
            )}
        />
    )
}

export default ReferenceAutocompleteFilter;