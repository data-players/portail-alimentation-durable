import React from 'react';
import { FormTab, TabbedForm, TextInput, ReferenceInput, AutocompleteArrayInput, } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import Edit from "../../../layout/edit/Edit";
import ResourceTitle from './ResourceTitle';
import { ColorInput } from 'react-admin-color-input';
import { makeStyles } from '@material-ui/core';
import { Box, Modal, Chip, IconButton, Typography } from '@mui/material';
import AddIcon  from '@mui/icons-material/Add';

const useStyles = makeStyles(theme => ({
  items: {
    display: "flex",
    alignItems:"center",
  },
  item: {
    marginRight:"10px"
  },
  button: {
    borderRadius: "16px",
  }
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TreeArrayinput = ({choices, input}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (input.value === "") { return null }
  const selectedValue = input.value.map((topic) => {
    const choice = choices.find((o) => o.id === topic);
    return choice ? choice : null;
  });

  const test = (route) => {
    if ( input.value.find(element => element === route.id) !== undefined) {
      var index = input.value.indexOf(route.id);
      if (index !== -1) {
        input.value.splice(index, 1);
      }
    } else {
      input.value.push(route.id)
    }
    handleClose();
  }

  function GenerateTreeItem( listTheme, routeTree, classes, parentId,) {
    // If !parentId it's a trunkItem
      const isParentLevel = !parentId;
      const listToUse = isParentLevel ? routeTree : listTheme.filter(({ ["pair:broader"]: themeSource }) => themeSource === parentId);
      return (
          listToUse.map((route) =>
          <>
            <Chip label={route["pair:label"]} onClick={() => { test(route) }}/>
            <div style={{paddingLeft: "8%"}}>
                {GenerateTreeItem( listTheme, [], classes, route["id"])}
            </div>
          </>
          )
      )
  }

  const CustomTreeSelector = ({topicList}) => {
    const classes = useStyles();
    let routeTree = [];
    for (const topic in topicList) {
      if (topicList[topic]['pair:broader'] === undefined ) {
        routeTree.push(topicList[topic]);
      }
    }

    return (
      <div>
          {GenerateTreeItem(topicList, routeTree, classes)}
      </div>
    ) 
  }

  return ( 
    <div className={classes.items}>
      {selectedValue.map((topic) =>
        topic ? 
          <Chip label={topic["pair:label"]} className={classes.item} color="primary" />
        : null
      )}
      <IconButton onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter une Thématique
          </Typography>         
          <CustomTreeSelector topicList={choices} />
        </Box>
      </Modal>
    </div>
  )
}

export const ResourceEdit = props => (
  <Edit title={<ResourceTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <TextInput label="Icone du thème" source="pair:icon" fullWidth />
        <ColorInput label="Couleur du thème" source="pair:color" />
      </FormTab>
      <FormTab label="Thématiques">
        <ReferenceInput label="Mots Clefs" reference="Keyword" source="pair:keywordOf" >
          <AutocompleteArrayInput optionText="pair:label" fullWidth />
        </ReferenceInput>
        <ReferenceInput label="Thème" reference="Theme" source="pair:topicOf" >
          <TreeArrayinput optionText="pair:label" />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ResourceEdit;
