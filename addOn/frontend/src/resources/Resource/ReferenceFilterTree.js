import React from 'react';
import { useGetList } from 'react-admin';
import {TreeItem, TreeView} from '@material-ui/lab';
import { useListFilterContext } from 'ra-core';
import LabelIcon from '@material-ui/icons/Label';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

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
      <CustomTreeItem nodeId={route["id"]} label={route[label]} key={route["id"]}>
        {GenerateTreeItem(source, label, allItems, [], route["id"])}
      </CustomTreeItem>
    )
  )
}

// const CustomContent = React.forwardRef(function CustomContent(props, ref) {
//   const {
//     classes,
//     className,
//     label,
//     nodeId,
//     icon: iconProp,
//     expansionIcon,
//     displayIcon,
//   } = props;

//   // const {
//   //   disabled,
//   //   expanded,
//   //   selected,
//   //   focused,
//   //   handleExpansion,
//   //   handleSelection,
//   //   preventSelection,
//   // } = useTreeItem(nodeId);

//   const icon = iconProp || expansionIcon || displayIcon;

//   const handleMouseDown = (event) => {
//     preventSelection(event);
//   };

//   const handleExpansionClick = (event) => {
//     handleExpansion(event);
//   };

//   const handleSelectionClick = (event) => {
//     handleSelection(event);
//   };

//   return (
//     // eslint-disable-next-line jsx-a11y/no-static-element-interactions
//     <div
//       className={clsx(className, classes.root, {
//         [classes.expanded]: expanded,
//         [classes.selected]: selected,
//         [classes.focused]: focused,
//         [classes.disabled]: disabled,
//       })}
//       onMouseDown={handleMouseDown}
//       ref={ref}
//     >
//       {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
//       <div onClick={handleExpansionClick} className={classes.iconContainer}>
//         {icon}
//       </div>
//       <Typography
//         onClick={handleSelectionClick}
//         component="div"
//         className={classes.label}
//       >
//         {label}
//       </Typography>
//     </div>
//   );
// });
  
function CustomTreeItem(props) {
  return <TreeItem 
    
  {...props} />;
}
  
const ReferenceFilterTree = ({ reference, source, label, limit, sort, filter, icon, predicate }) => {
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
    <div>
      <LabelIcon style={{ color: 'black',  }} />
      {reference}
      <TreeView
        multiSelect
        onNodeSelect={handleSelect}
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {GenerateTreeItem(source, label, allItems, routeTree)}
      </TreeView>
    </div>
  )
};

export default ReferenceFilterTree;