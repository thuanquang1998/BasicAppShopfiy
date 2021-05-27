//@flow
import React, { Component } from 'react';
import { Page, Button, Stack, Card, Tabs, TextField, DisplayText, Toast, Frame } from '@shopify/polaris';

const INITIAL_STATE = {
    loading: false,
}
class DataColumns extends Component {
    constructor(props) {
        super(props)
        this.state = {...INITIAL_STATE}
    }
    render() {
        return (

            <Page
                // breadcrumbs={[{content: 'Products', url: '/products'}]}
                title="Data columns"
                subtitle="These serve to connect the data from fields to your customers, allowing us to reliably perform advanced actions such as filtering, formatting and importing data."
                primaryAction={
                    <Button
                        primary
                        connectedDisclosure={{
                            // accessibilityLabel: 'Other save actions',
                            actions: [{content: 'Add data column'}],
                        }}
                        >
                    Add Data Column
                    </Button>
                 }
            >
                DataColumns Page
            </Page>
        );
    }
}

export default DataColumns;