//@flow
import React, { Component } from 'react';
import { Page, Button, Card, Tabs, Stack, DataTable } from '@shopify/polaris'


const INITIAL_STATE = {
    loading: false,
    tabs : [
        {
        id: 'all-product',
        content: 'All',
        },
        {
        id: 'active-product',
        content: 'New Customers',
        },
        {
        id: 'draft-product',
        content: 'Active accounts',
        },
        {
        id: 'archived product',
        content: 'Marketing opt-ins',
        },
    ],
    rows : [
        ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
        ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
        [
        'Navy Merino Wool Blazer with khaki chinos and yellow belt',
        '$445.00',
        124518,
        32,
        '$14,240.00',
        ],
    ]
}

class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {...INITIAL_STATE}
    }
    handleTabChange = (selectedTabIndex) => {
        this.setState({selected:selectedTabIndex})
    }
    
    render() {
        return (
            <Page
                title="Customers"
                subtitle={
                    <>
                        <Button>Import</Button>
                        <Button>Export</Button>
                    </>
                }
                primaryAction={{
                    content: 'Add Customer', 
                    disabled: false,
                    onAction: () => this.props.gotoPage('add-customer')
                }}
            >
                {/* <Card>
                    <Tabs tabs={this.state.tabs} selected={this.state.selected} onSelect={this.handleTabChange}>
                        <Card.Section>
                            aa
                        </Card.Section>
                    </Tabs>
                </Card> */}

                <Card>
                    {/* LoadingBar */}
                    {/* header */}
                    <Card>
                        <Stack>
                            <p>Showing 2 of 2 customers</p>
                            <div>
                                <p>Showing 8 of 30 columns</p> 
                                {/* action show columns */}
                            </div>
                        </Stack>
                    </Card>
                    {/* data table */}
                    <DataTable
                        columnContentTypes={[
                            'text',
                            'numeric',
                            'numeric',
                            'numeric',
                            'numeric',
                        ]}
                        headings={[
                            'Product',
                            'Price',
                            'SKU Number',
                            'Net quantity',
                            'Net sales',
                        ]}
                        rows={this.state.rows}
                        totals={['', '', '', 255, '$155,830.00']}
                    />
                </Card>
            </Page>
        );
    }
}

export default Customers;