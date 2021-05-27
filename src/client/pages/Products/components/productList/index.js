import React, {useCallback, useState, useEffect} from 'react';
import {Avatar, TextStyle, Button, Card, TextField, Frame, Toast,Icon, Filters, ResourceItem, FormLayout, ResourceList,Modal, TextContainer, Thumbnail, Stack, ChoiceList,RangeSlider, Badge, Layout, Pagination} from '@shopify/polaris';
import {Icons} from './../../../../asset/Icons';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import { debounce } from 'lodash';
import axios2 from '../../../../funcs/axios'
import ProductFilter from '../productFilter';
import ProductsApi from '../../../../apis/products';
import './styles.scss';

// get data from parent component OK
// render data OK
// handle filter then pass data to parent to get data
// edit data
// delete
  

export default function ProductList(props) {
  const productList = props.data.products.items;
  // console.log("11111111111111", productList);
  
  
  // get list product
  const [loadingPage, setLoadingPage] = useState(true)
  const [test, setTest] = useState([]);
  // state of sort list_products
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);
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

  const getListProducts = async (status) => {
    console.log("getListProducts at productList component")
    const all_data = [];
    setLoadingPage(true)
    const {actions} = props.data
    let res = await ProductsApi.find({})
    if (res.success) {
      // actions.setListProducts(res.payload.products);
      test = [...test,...res.payload.products];
      if(res.payload.pageInfo.hasNextPageInfo === true) {
        getListProducts();
      }
    } else {
      console.log('res.error :>> ', res.error);
    }
    setLoadingPage(false)
  }
  
  const handleEditModal = (id) => {
    props.handleEditModal(id)
  }
  const handleDeleteProduct = (id) => {
    props.handleDeleteProduct(id)
  }
  const handleQueryObj = (value) => {
    props.queryObj(value);
  }
  const handleStatus = (status) => {
    switch (status) {
      case 'active':
        return (<Badge status="success">
              Active
            </Badge>);
        break;
      case 'draft':
        return <Badge status="success">
              Draft
            </Badge>;
        break;
      default:
        return (<Badge status="success">
              Active
            </Badge>);
        break;
    }
  }
   return (
    <Frame>
      <Card>
        <ResourceList
          resourceName={{
            singular: 'customer',
            plural: 'customers',
          }}
          items={productList}
          renderItem={renderItem}

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
            // console.log(`Sort option changed to ${selected}.`);
          }}

          filterControl={
            <ProductFilter
              queryObj={handleQueryObj}
            />
          }
          loading={props.loadingResource}
        />
        <div className="resource__list--pagination">
          <Pagination
            hasPrevious={props.pageInfo?.hasPreviousPage}
            onPrevious={() => {
              props.onPreviousPage();
            }}
            hasNext={props.pageInfo?.hasNextPage}
            onNext={() => {
              props.onNextPage();
            }}
          />
        </div>
      </Card>
      {/* {toastMarkup} */}
    </Frame>
  );

  
  function renderItem(productList) {
    const {id, title,url, product_type,location, vendor, latestOrderUrl, image, status} = productList;
    const media = <Thumbnail
                  source={image?.src || Icons.pictures}
                    alt="Black choker necklace"
                />
    return (
      <ResourceItem
        horizontalAlignment="center"
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <div className="resource__list--row">
          <div><TextStyle variation="strong">{title}</TextStyle></div>
          <div>
            {handleStatus(status)}
          </div>
          <div><Badge status="warning">0</Badge> in stock</div>
          <div>{product_type}</div>
          <div>{vendor}</div>
          <div>
            <div className="btn-product">
              <Button primary onClick={()=>handleEditModal(id)} >Edit</Button>
              <Button destructive onClick={()=>handleDeleteProduct(id)} >Delete</Button>
            </div>
          </div>
        </div>
      </ResourceItem>
    );
  }
}
