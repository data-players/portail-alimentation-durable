import React from 'react';
import { useGetList } from 'react-admin';
import { TreeItem, TreeView, useTreeItem } from '@mui/lab';
import { useListFilterContext } from 'ra-core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelOutlinedIcon from '@material-ui/icons//CancelOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';

/**
 * @example
 * const FilterAside = () => (
 *   <Card>
 *     <CardContent>
 *       <FilterLiveSearch source="pair:label" />
 *       <ReferenceFilterTree
 *         reference="Theme"
 *         source="pair:broader"
 *         label="pair:label"
 *         icon={icon}
 *         predicate={"http://virtual-assembly.org/ontologies/pair#hasTopic"}
 *       />
 *     </CardContent>
 *   </Card>
 * );
 */

function GenerateTreeItem(source, label, allItems, routeTree, parentId) {
  // If !parentId it's a trunkItem
  const isParentLevel = !parentId;
  const listToUse = isParentLevel ? routeTree : allItems.filter(({ [source]: itemSource }) => itemSource === parentId);
  return (
    listToUse.map((route) =>
    <div>
      <CustomTreeItem
        route={route}
        label={<div
          style={{
            fontSize: "0.875rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: 400,
            lineHeight: 1.43,
            letterSpacing: "0.01071em"
          }}>{route["pair:label"]}
        </div>}
        nodeId={route["id"]} 
        key={route["id"]} 
        selected={true} >
          {GenerateTreeItem(source, label, allItems, [], route["id"])}
      </CustomTreeItem>
    </div>
    )
  )
}

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event, b) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

CustomContent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
};

function CustomTreeItem(props) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}

const ReferenceFilterTree = ({ reference, source, label, limit, sort, filter, icon, predicate, title }) => {
  const { data } = useGetList(reference, { page: 1, perPage: Infinity }, sort, filter);
  const { filterValues, setFilters } = useListFilterContext();

  let routeTree = [], allItems = [];
  for (const item in data) {
    if (data[item][source] === undefined ) {
      routeTree.push(data[item]);
    }
    allItems = allItems.concat(data[item]);
  }

  const handleSelect = (event, nodes) => {
    // const isCollapseIconClicked = event.target.tagName === 'svg';
    // if (!isCollapseIconClicked) {
    const sparqlWhere = {
      "type": "bgp",
      "triples": nodes.map((node) => {
        return {
          subject: {
            termType: 'Variable',
            value: 's1',
          },
          predicate: {
            termType: 'NamedNode',
            value: predicate,
          },
          object: {
            termType: 'NamedNode',
            value: node,
          },
        };
      }),
    }

    const encodedQuery = encodeURIComponent(JSON.stringify(sparqlWhere));
    setFilters({...filterValues, "sparqlWhere": encodedQuery })
  }
  
  return (
    <div style= {{marginTop: "16px"}}>
      <div style={{display: "flex", alignItems: "center"}}>
        <LocalOfferIcon style={{ color: 'black', marginRight: "8px" }} />
        <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: "0.75rem", letterSpacing: "0.08333em"}}>
          {title !== undefined ? title.toUpperCase(): reference.toUpperCase()}
        </div>
      </div>
      <TreeView
        multiSelect
        onNodeSelect={handleSelect}
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        style={{paddingLeft:"10px"}}
      >
        {GenerateTreeItem(source, label, allItems, routeTree, undefined)}
      </TreeView>
    </div>
  )
};

export default ReferenceFilterTree;