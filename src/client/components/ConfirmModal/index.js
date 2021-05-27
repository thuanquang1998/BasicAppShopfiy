// props = {
//     open, //openModal
//     onClose, //setState(open=false)
//     title, //title of Modal
//     primaryAction = {
//         content: "Delete ||Submit||...",
//         onAction: onDelete || onSumbit,
//     }
//     secondaryActions: {
//         content: "Cancel",
//         onAction: onClose
//     },
//     content: "Are you sure you want to delete the product a1111123? This can’t be undone.";
// }
//@flow 

import React, {useCallback, useState} from 'react';
import {Button, TextContainer, Modal} from '@shopify/polaris';

export default function ConfirmModal(props) {
    const { open, title, onClose, primaryAction, secondaryActions, content } = props;
    // const {open, setOpen} = useState(props.open);
    // const onClose = () => {
    //     setOpen(false)
    // }
  return (
    <div style={{height: '500px'}}>
      <Modal
        open={open}
        onClose={onClose}
        title={title}
        primaryAction={{
          content: primaryAction.content,
          onAction: primaryAction.onAction,
          loading: props.isLoading,
        }}
        secondaryActions={[
          {
            content: secondaryActions.content,
            onAction: secondaryActions.onAction,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
             {content}
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
