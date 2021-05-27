import { DisplayText, Stack, Button } from '@shopify/polaris'
import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    const {gotoPage} = this.props
    console.log('this.props :>> ', this.props);
    return (
      <Stack vertical>
        <DisplayText size="small">Home Page</DisplayText>
        <Button>Test route</Button>

        <Button onClick={() => gotoPage('customers')}>Customers</Button>
      </Stack>
    )
  }
}

export default Home
