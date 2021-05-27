import React,{useState} from 'react';
import {Card, EmptyState, Frame, Filters, Layout, Page, ResourceList, SkeletonBodyText} from '@shopify/polaris';
import ProductFilter from '../productFilter';
export default function ProductPageSkeleton() {
     // // state of sort list_products
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);
  const items = [1,2,3];
  // handle selected Item
  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];
   const handleQueryObj = (value) => {
    // props.queryObj(value);
  }
  return (
      <Frame>
      <Card>
        <ResourceList
            // selected
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}

            // sort list
            sortValue={sortValue}
            sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
            ]}
            onSortChange={(selected) => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
            }}
            resourceName={{
                singular: 'customer',
                plural: 'customers',
            }}
            items={items}
            renderItem={(item) => {
                return (SkeletonBodyText)
            }}
            filterControl={<ProductFilter queryObj={handleQueryObj}/>}
        />
      </Card>
    </Frame>
  );
}
