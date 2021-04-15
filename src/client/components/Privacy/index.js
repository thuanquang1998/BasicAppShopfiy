// @flow
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMd from 'react-md-file'
import mdFile from './privacy.md'
import { Button, Card, DisplayText, Stack } from '@shopify/polaris'
import './github-markdown.css'
import './styles.scss'

Privacy.propTypes = {
  onAction: PropTypes.func,
  acceptedDate: PropTypes.string,
}

Privacy.defaultProps = {
  onAction: () => null,
  acceptedDate: '',
}

function Privacy(props) {
  const { onAction, acceptedDate } = props

  useEffect(() => {
    if (document.getElementById('no-root')) {
      document.getElementById('no-root').remove()
    }
  }, [])

  return (
    <div className="app-privacy">
      <Card>
        <Stack vertical>
          {acceptedDate && (
            <Stack distribution="trailing">
              <DisplayText size="small">Accepted date: {acceptedDate}</DisplayText>
            </Stack>
          )}

          <div className="privacy-wrapper markdown-body">
            <ReactMd fileName={mdFile} />
          </div>

          <Stack distribution="trailing">
            <Button primary onClick={onAction}>
              {acceptedDate ? 'Close' : 'Accept Privacy!'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </div>
  )
}

export default Privacy
