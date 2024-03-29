import React, { useState  } from 'react';
import { AutocompleteInput, useGetList, useInput } from "react-admin";
import Button from '@mui/material/Button';
import {TreeView} from '@mui/x-tree-view';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { generateTreeItem, buildTreeData } from './TreeItemUtils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/*
* Exemple :
*   <ReferenceArrayInput label="Sujet de" reference="Theme" source="pair:hasTopic" fullWidth >
*   <TreeAutocompleteInput 
*       optionText="pair:label" // define the text render for each item render
*       parentProperty="pair:broader"  // define the parent of a node in tree
*       resettable={true} // true if you want to add a delete icon; false to hide it
*       treeReference="Theme" // same as reference from ReferenceArrayInput, but react admin transform the reference to choices aray and don't call TreeAutocompleteArrayInput whit reference props. treeReference specify resource used to build tree.
*       shouldRenderSuggestions={value => false} // shouldRenderSuggestions RA . can be set to common shouldRenderSuggestions function if you want user use sugestion
*       defaultExpanded={true} // boolean to default expand or not the treeItem selector when modal opening
*   />
*   </ReferenceArrayInput>
*/

const useStyles = makeStyles(theme => ({
    editIcon: { 
        backgroundColor:"#026a63", 
        borderRadius: "25%", 
        color: "white",
        height: "25px"
    },
    treeStyle: {
        paddingLeft: "15px"
    },
}));

const TreeAutocompleteInput = (props) => {
    const style = useStyles();
    const {field} = useInput({source:"pair:broader"});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const  {data, isLoading}  = useGetList(props.treeReference, {pagination:{ page: 1, perPage: Infinity }});
    if (isLoading) return null;

    const isFullWidth = props.fullWidth === true;

    const handleSelect = (event, nodes) => {
        field.onChange(nodes.id)
        handleClose();
    };

    const treeData = buildTreeData(data, props.parentProperty, props.defaultExpanded);
    return (
        <div style={{display: "flex", alignItems: "top"}}>
            <div style={{flexGrow: isFullWidth ? 1 : 0}}>
                <AutocompleteInput {...props} />
            </div>
            <div style={{paddingTop: "20px", paddingLeft: "10px"}}>
                <EditIcon className={style.editIcon} onClick={handleOpen} />
            </div>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle >Choix du {props.treeReference} </DialogTitle>
                <TreeView 
                    defaultExpanded={treeData.expendedNodes}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    className={style.treeStyle}
                >
                    {generateTreeItem(props.parentProperty, props.optionText, treeData.allItems, treeData.routeTree, false, [], handleSelect)}
                </TreeView >
                <DialogActions >
                    <Button label="ra.action.close" variant="text" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TreeAutocompleteInput;
