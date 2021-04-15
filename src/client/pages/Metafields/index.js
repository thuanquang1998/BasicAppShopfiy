import React, { Component } from 'react';
import ProductsApi from '../../apis/products';
import './styles.scss'

class Metafields extends Component {
  
  getProducts = async () => {
    const {actions} = this.props
    let res = await ProductsApi.find({})
    console.log('getProducts res :>> ', res);
    if (res.success) {
      actions.setListMetafields(res.payload.products)
    } else {
      console.log('res.error :>> ', res.error);
    }
  }

  componentDidMount(){
    console.log('componentDidMount');
    this.getProducts()
  }

  render() {
    console.log('this.props :>> ', this.props);
    return (
      <div>
        Metafields page
      </div>
    );
  }
}

export default Metafields;