import React from 'react';
import { 
  Datagrid, 
  ShowButton, 
  ChipField,  
  DatagridBody,
} from 'react-admin';
import List from "../../layout/list/List";
import { Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ResourceFilterSideBar from './ResourceFilterSideBar';
import ChipList from '../../common/list/ChipList'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ReferenceField from '../../common/field/ReferenceField';
import ReferenceArrayField from '../../common/field/ReferenceArrayField';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles(theme => ({
  description: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2, // Number of lines to show before truncating
    overflow: 'hidden',
    maxWidth: "800px",
    [theme.breakpoints.down('xl')]: {
      maxWidth: "400px",
    },
  },
  link:{
    fontSize: "18px"
  },
  linkText: {
    color: "#026a63", 
    fontSize: "18px"
  },
  ChipList: {
    [theme.breakpoints.down('xl')]: {
      maxWidth: "100px",
      overflow: "hidden"
    }
  },
}));

const CustomDatagridRow = ({ record, resource, id, children, basePath }) => {
  return (
    <TableRow key={id}>
      {React.Children.map(children, field => (
          <TableCell style={{width: field.props.width}} key={`${id}-${field.props.source}`}>
              {React.cloneElement(field, {
                  record,
                  basePath,
                  resource,
              })}
          </TableCell>
      ))}
    </TableRow>
  )
};

const CustomDatagridBody = props => <DatagridBody {...props} row={<CustomDatagridRow />} />;
const CustomDatagrid = props => <Datagrid bulkActionButtons={false} {...props} body={<CustomDatagridBody />} />;

const CustomUrlField = ({record, sourceLink, descriptionSource, title, cssStyle}) => {
  if (!record[sourceLink]) return (
    <>
      <div className={cssStyle.linkText} >{record[title]}</div>
      <div className={cssStyle.description} >{record[descriptionSource]}</div>
    </>
  )

  return(
    <div>
      <Link href={record[sourceLink]} color="primary" target="_blank" underline="hover" className={cssStyle.link} >{record["pair:label"]}</Link>
      <div className={cssStyle.description} >{record[descriptionSource]}</div>
    </div>
  )
}

const ResourceList = props => {
  const style = useStyles();
  const isAuthicate = localStorage.getItem('token') !== null
  const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  return (
    <List {...props} aside={<ResourceFilterSideBar />} >
      <CustomDatagrid  style={{tableLayout: 'auto'}} >
        <CustomUrlField label="Ressource" width="60%" title="pair:label" sourceLink="pair:homePage" cssStyle={style} descriptionSource="pair:description" />
        <ReferenceField label="Source" source="pair:hasDataSource" reference="Datasource" linkType={false} >
            <ChipField source="pair:label" 
              style={{
                color: "#026a63", 
                maxWidth: isXl ? '' : '100px',
              }} 
            />
        </ReferenceField>
        <ReferenceArrayField label="Thèmes" reference="Theme" source="pair:hasTopic" className={style.ChipList} >
          <ChipList primaryText="pair:label" linkType={false} />
        </ReferenceArrayField>
        {isAuthicate ? <ShowButton /> : <></>}
      </CustomDatagrid>
    </List>
  )
};

export default ResourceList;
