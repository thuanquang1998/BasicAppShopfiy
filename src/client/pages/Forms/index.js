//@flow
import React, { Component } from 'react';
import { Page, Button, Stack, Card, Tabs, TextField, DisplayText, Toast, Frame } from '@shopify/polaris';

const INITIAL_STATE = {
    loading: false,
}
class Forms extends Component {
    constructor(props) {
        super(props)
        this.state = {...INITIAL_STATE}
    }
    render() {
        return (
            <Page>
            Forms Page
            </Page>
        );
    }
}

export default Forms;