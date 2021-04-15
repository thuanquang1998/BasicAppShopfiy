import React, { Component } from 'react'
import { Page, Button, Stack, Card, Tabs, TextField, DisplayText } from '@shopify/polaris'
import ProductPage from './components/productPage';

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
     console.log(this.props,"---------------");
  }
 
  // getProducts = async () => {
  //   const {action} = this.props;
  //   let res = await
  // }

  handleTabChange = (selectedTabIndex) => {
    this.setState({selected:selectedTabIndex})
  }
  
  tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Active',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Draft',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Archived',
      panelID: 'prospects-content-1',
    },
  ];
  
  render() {
    console.log('this.state :>> ', this.state);
    return (
      <div className="product__page">
        <Page>
        {/* header */}
          <Stack>
            <Stack.Item fill>
              <DisplayText size="medium">Product Page</DisplayText>
            </Stack.Item>
            <Stack.Item>
              <Button primary>Add product</Button>
            </Stack.Item>
          </Stack>
        {/* tabs */}
          <Card>
            <Tabs tabs={this.tabs} selected={this.state.selected} onSelect={this.handleTabChange}>
              <Card.Section>
                <ProductPage/>
              </Card.Section>
            </Tabs>
          </Card>
        </Page>
      </div>
    )
  }
}

export default Products
