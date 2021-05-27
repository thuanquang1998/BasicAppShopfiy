import React, { PureComponent } from 'react'
import { Spinner } from '@shopify/polaris';
import './styles.scss'

class LoadingPage extends PureComponent {
    render() {
        return (
            <div className="loading-page">
                <Spinner />
            </div>
        )
    }
}

export default LoadingPage