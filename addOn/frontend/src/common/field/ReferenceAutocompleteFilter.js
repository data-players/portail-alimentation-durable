import React from "react";
import { useListFilterContext } from 'ra-core';
import { Grid } from '@material-ui/core';
import { Form } from 'react-final-form';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { AutocompleteInput, ReferenceInput } from 'react-admin';

const ReferenceAutocompleteFilter = (props) => {    
    const { filterValues, setFilters } = useListFilterContext();

    const onChange = (choice) => {
        setFilters({...filterValues, "pair:hasDepartment": choice});
    }

    return (
        <div style= {{marginTop: "16px"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <LocalOfferIcon style={{ color: 'black', marginRight: "8px" }} />
                <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: "0.75rem", letterSpacing: "0.08333em"}}>
                    {props.title !== undefined ? props.title.toUpperCase(): props.reference.toUpperCase()}
                </div>
            </div>
            <Form
                onSubmit={() => {}}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ReferenceInput onChange={onChange} {...props} >
                                    <AutocompleteInput {...props} />
                                </ReferenceInput>      
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </div>
        
    )
}

export default ReferenceAutocompleteFilter;