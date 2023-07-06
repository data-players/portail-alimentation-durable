import React from 'react';
import { useGetList } from 'react-admin';
import {TreeItem, TreeView} from '@material-ui/lab';
import { useListFilterContext } from 'ra-core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';import clsx from 'clsx';

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
      <TreeItem nodeId={route["id"]} label={route[label]} key={route["id"]} 
        style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: "0.875rem", lineHeight: "1.43", letterSpacing: "0.01071em"}}
      >
        {GenerateTreeItem(source, label, allItems, [], route["id"])}
      </TreeItem>
    )
  )
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
          {title != undefined ? title.toUpperCase(): reference.toUpperCase()}
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
        {GenerateTreeItem(source, label, allItems, routeTree)}
      </TreeView>
    </div>
  )
};

export default ReferenceFilterTree;