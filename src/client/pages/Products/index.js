import React, { Component } from 'react'
import { Page, Button, Stack, Card, Tabs, TextField, DisplayText, Toast, Frame } from '@shopify/polaris'
import ProductList from './components/productList';
import ProductsApi from '../../apis/products';
import ProductsGraphqlApi from '../../apis/products-graphql';
import LoadingPage from '../../components/LoadingPage';
import ProductPageSkeleton from './components/productPageSkeleton';
import ProductEdit from './components/productEdit';
import ProductCreate from './components/productCreate';
import ConfirmModal from '../../components/ConfirmModal';
import ToastComponent from '../../components/ToastComponent';
// import '../styles.scss'; 

type Props = {}

type State = {
  loadingPage: boolean,
  isLoading: boolean,
  openCreateModal: boolean,
  openEditModal: boolean,
  openDeleteModal: boolean,
  product: object,
  productId: string,
  toast: object,
  selected: number,
  pageInfo: object,
  queryObj: object,
}

const INITIAL_STATE = {
  loadingPage: true,
  isLoading: false,
  openCreateModal: false,
  openEditModal: false,
  openDeleteModal: false,
  product: {},
  productId: "",
  toast: {
    activeToast: false,
    contentToast: "",
  },
  selected: 0,
  pageInfo: {},
  queryObj:{}, 
  tabs : [
    {
      id: 'all-product',
      content: 'All',
    },
    {
      id: 'active-product',
      content: 'Active',
    },
    {
      id: 'draft-product',
      content: 'Draft',
    },
    {
      id: 'archived product',
      content: 'Archived',
    },
  ],
}
class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {...INITIAL_STATE}
  }
  // restful
  getListProducts = async ({limit,pageInfo, search, status}) => {
    this.setState({isLoading:true})
    const {actions} = this.props;
    let res = await ProductsApi.find({limit,pageInfo,status, search})
    if (res.success) {
      actions.setListProducts(res.payload.products);
      this.setState({pageInfo:res.payload.pageInfo})
    } else {
      console.log('res.error :>> ', res.error);
    }
    this.setState({isLoading:false})
  }
  getProductById = async (id) => {
    let res= await ProductsApi.findById(id);
    if (res.success) {
      this.setState({
        isLoading: false,
        openEditModal: true,
        product: res.payload.product,
      })
    } else {
      console.log('res.error :>> ', res.error);
    }
  }
  createProduct = async (data) => {
    let res = await ProductsApi.create(data);
    console.log('res :>> ', res);
    if(res.success) {
      // this.getListProducts({});
      this.getListProductsGraphql({});
      this.setState({
        openCreateModal: false,
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: 'Create successed'
        }
      })
    } else {
      console.log('res.error :>> ', res.error);
    }
  }
  updateProduct = async (data) => {
    console.log("update Product");
    let res = await ProductsApi.update(data);
    if(res.success) {
      this.getListProducts();
      this.setState({
        isLoading: false,
        openEditModal: false,
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: 'Update successed'
        }
      })
    } else {
      console.log('res.error :>> ', res.error);
    }
  }
  deleteProduct = async (id) => {
    let res = await ProductsApi.delete(id);
    if (res.success) {
      this.setState({
        openDeleteModal: false,
        productId: "",
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: 'Delete successed',
        }
      })
      this.getListProducts();
    } else {
      this.setState({
        openDeleteModal: false,
        productId: "",
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: res.error,
        }
      })
    }
  }
  // graphql
  getListProductsGraphql = async ({limit, nextPageInfo, previousPageInfo, search, status, vendor}) => {
    this.setState({isLoading:true})
    const {actions} = this.props;
    let res = await ProductsGraphqlApi.find({limit, nextPageInfo, previousPageInfo, search, status, vendor})
    if (res.success) {
      actions.setListProducts(res.payload.items);
      this.setState({pageInfo:res.payload.pageInfo})
    } else {
      console.log('res.error :>> ', res.error);
    }
    this.setState({isLoading:false, loadingPage: false})
  }
  getProductByIdGraphql = async (id) => {
    let res = await ProductsGraphqlApi.find({id});
    console.log('res getProductByGraphql:>> ', res);
    if (res.success) {
      this.setState({
        isLoading: false,
        openEditModal: true,
        product: res.payload.data.product,
      })
    } else {
      console.log('res.error :>> ', res.error);
    }
  }
  createProductGraphql = async (data) => {
    let res = await ProductsGraphqlApi.create(data);
    if(res.success) {
      this.getListProductsGraphql({});
      this.setState({
        openCreateModal: false,
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: 'Create successed'
        }
      })
    } else {
      console.log('res.error :>> ', res.error);
    }
  }
  updateProductGraphql =  async (data) => {
    let res = await ProductsGraphqlApi.update(data);
    if(res.success) {
      this.getListProductsGraphql({});
      this.setState({
        openEditModal: false,
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: 'Update successed'
        }
      })
    } else {
      console.log('res.error :>> ', res.error);
    }
  }
  deleteProductGraphql = async (id) => {
    let res = await ProductsGraphqlApi.delete(id);
    if (res.success) {
      this.getListProductsGraphql({});
      this.setState({
        openDeleteModal: false,
        productId: "",
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: 'Delete successed',
        }
      })
    } else {
      this.setState({
        openDeleteModal: false,
        productId: "",
        toast: {
          ...this.state.toast,
          activeToast: true,
          contentToast: res.error,
        }
      })
    }
  }
  componentDidMount(){
    // this.getListProducts({});
    this.getListProductsGraphql({});
    // this.getAllProducts();
  }

  handleTabChange = (selectedTabIndex) => {
    this.setState({selected:selectedTabIndex})
    let status="";
    switch (selectedTabIndex) {
      case 0:
        // this.getListProducts({status})
        this.getListProductsGraphql({status})
        break;
      case 1:
        status='Active';
        // this.getListProducts({status})
        this.getListProductsGraphql({status})
        break;
      case 2:
        status="Draft";
        // this.getListProducts({status})
        this.getListProductsGraphql({status})
        break;
      case 3:
        status="Archived";
        // this.getListProducts({status})
        this.getListProductsGraphql({status})
        break
      default:
        break
    }
  }
  handleQueryObj = (queryObj) => {
    const search = queryObj?.queryTitle;
    let vendor = "";
    
    if(queryObj.queryVendor !== null) {
      if(queryObj.queryVendor.length!==0){
        console.log('queryObj.queryVendor[0] :>> ', queryObj.queryVendor[0]);
        vendor = queryObj.queryVendor[0]
      }
    } else {
      vendor = "";
    }
    this.getListProductsGraphql({search, vendor});
  }
  getAllProducts = async () => {
    let res = await ProductsGraphqlApi.getAllProducts()
    if (res.success) {
      const id = res.payload.bulkOperation.id;
      console.log('id :>> ', id);
      const getData = setInterval(async () => {
        let res = await ProductsGraphqlApi.pollGetAllProducts(id);
        if (res.success) {
          if(res.payload.status === 'COMPLETED'){
            clearInterval(getData);
            const allData = await ProductsGraphqlApi.getAllData(res.payload.url)
            if(allData.success) {
              console.log(allData,"000000")
            }
          }
        }
      }, 2000);
    } 
  }
  // getDataFromURL = async (url) => {
  //   const data = 
  // }
  pollGetAllProducts =  async (id) => {
    let res = await ProductsGraphqlApi.pollGetAllProducts(id);
    let result = ""
    if (res.success) {
      result = res.payload.status;
    } else {
      result = "";
    }
    return result;
  }
  render() {
    return (
      <Frame>
        {this.state.loadingPage && <LoadingPage/>}
        <Page>
        {/* header */}
          <Stack>
            <Stack.Item fill>
              <DisplayText size="medium">Product Page</DisplayText>
            </Stack.Item>
            <Stack.Item>
              <Button primary onClick={this.getAllProducts}>getAllProducts</Button>
              <Button primary onClick={()=>this.setState({openCreateModal:true})}>Add product</Button>
            </Stack.Item>
          </Stack>
        {/* tabs */}
          <Card>
            <Tabs tabs={this.state.tabs} selected={this.state.selected} onSelect={this.handleTabChange}>
              <Card.Section>
                {this.state.loadingPage? 
                  <ProductPageSkeleton/>: 
                  <ProductList 
                    data={this.props}
                    queryObj = {this.handleQueryObj}
                    onNextPage = {()=>{
                      const nextPageInfo = this.state.pageInfo?.nextPageInfo;
                      // this.getListProducts({pageInfo})
                      this.getListProductsGraphql({nextPageInfo})
                    }}
                    onPreviousPage = {()=>{
                      const previousPageInfo = this.state.pageInfo?.previousPageInfo;
                      // this.getListProducts({pageInfo})
                      this.getListProductsGraphql({previousPageInfo})
                    }}
                    pageInfo = {this.state.pageInfo}
                    handleEditModal = {(id)=>{
                      // this.getProductById(id);
                      this.getProductByIdGraphql(id);
                    }}
                    handleDeleteProduct = {(id)=>{
                      this.setState({
                        openDeleteModal: true,
                        productId: id,
                      })
                    }}
                    loadingResource = {this.state.isLoading}
                  />
                }}
              </Card.Section>
            </Tabs>
          </Card>
        </Page>
        {this.state.openCreateModal && 
          <ProductCreate
            open = {true}
            title = "Create Product"
            onClose = {()=>this.setState({
              openCreateModal: false,
            })}
            primaryAction = {(data)=>{
              this.setState({
                isLoading: true,
              })
              // this.createProduct(data);
              this.createProductGraphql(data);
            }}  
            secondaryAction = {()=>this.setState({
              openCreateModal: false,
            })}
            isLoading={this.state.isLoading}
          />
        }
        {this.state.openEditModal && (
          <ProductEdit
            title = "Edit Product"
            open = {true}
            onClose = {()=> this.setState({
              openEditModal: false
            })}
            primaryAction = {(data)=>{
              this.setState({isLoading:true});
              // this.updateProduct(data);
              this.updateProductGraphql(data);
            }}
            secondaryAction = {()=> this.setState({
             openEditModal: false
            })}
            data={this.state.product}
            isLoading={this.state.isLoading}
          />
        )}
        {this.state.openDeleteModal && (
          <ConfirmModal
            title = "Delete Product"
            open = {true}
            onClose = {()=>this.setState({openDeleteModal:false})}
            primaryAction = {{
              content:"Delete",
              onAction: ()=> {
                this.setState({
                  isLoading:true
                })
                // this.deleteProduct(this.state.productId);
                this.deleteProductGraphql(this.state.productId);
              }
            }}
            secondaryActions = {{
              content: "Cancel",
              onAction: ()=>this.setState({openDeleteModal:false})
            }}
            content =  "Are you sure you want to delete this product? This can’t be undone."
            isLoading={this.state.isLoading}
          />
        )}
        <ToastComponent
          active = {this.state.toast.activeToast}
          content = {this.state.toast.contentToast}
          onToogleActive = {()=> {
            this.setState({toast: {...this.state.toast, activeToast:false}})
          }}
        />
      </Frame>
    )
  }
}
export default Products
