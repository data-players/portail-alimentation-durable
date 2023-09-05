import React, { useEffect } from "react";
import { useListFilterContext } from 'ra-core';
import { Grid } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AutocompleteInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import { useForm, FormProvider } from 'react-hook-form';

const ReferenceAutocompleteFilter = (props) => {
    const { filterValues, setFilters } = useListFilterContext();

    const form = useForm({
        defaultValues: filterValues,
    });

    const onChange = (choice) => {
        setFilters({...filterValues, [props.source]: choice});
    }

    useEffect(() => {
        if (filterValues[props.source] === undefined) {
            form.reset();
        }
    }, [filterValues])

    return (
        <FormProvider {...form}>
            <div style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <LocalOfferIcon style={{ color: 'black', marginRight: "8px" }} />
                    <div style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: "0.75rem", letterSpacing: "0.08333em" }}>
                        {props.label !== undefined ? props.label.toUpperCase() : props.reference.toUpperCase()}
                    </div>
                </div>
                <Grid container spacing={2} style={{paddingTop: "5px"}}>
                    <Grid item xs={12}>
                        <ReferenceInput  {...props}>
                            <AutocompleteInput onChange={onChange} {...props} />
                        </ReferenceInput>
                    </Grid>
                </Grid>
            </div>
        </FormProvider>
    )
}

export default ReferenceAutocompleteFilter;