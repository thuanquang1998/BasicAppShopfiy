import React, {useCallback, useState} from 'react';
import {Button, Frame, Page, Toast} from '@shopify/polaris';

export default function ToastComponent(props) {
  const toastMarkup = props.active ? (
    <Toast content={props.content||""} onDismiss={props.onToogleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      {toastMarkup}
    </div>
  );
}
