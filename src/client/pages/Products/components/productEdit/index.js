import React, {useState} from 'react';
import { Modal, Form ,FormLayout, Checkbox, Button, TextField } from '@shopify/polaris';

const ProductEdit = (props) => {
    const {open, onClose, title, primaryAction, secondaryAction, data}=props;
    const [nameProduct, setNameProduct] = useState(null);
    const hanldePrimaryAction = () => {
        const _data = {...data,title:nameProduct};
        primaryAction(_data);
        // setNameProduct(null);
    }
    const handleSecondaryAction = () => {
        // setNameProduct(null);
        secondaryAction();
    }
    const handleOnClose = () => {
        setNameProduct(null);
        onClose();
    }

    const handleChangeTitle = (value) => {
        setNameProduct(value)
    }
    return (
        <Modal
            open={open}
            onClose={handleOnClose}
            title={title}
            primaryAction={{
              content: 'Submit',
              onAction: hanldePrimaryAction,
              loading: props.isLoading,
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: handleSecondaryAction,
              },
            ]}
        >
            <Modal.Section>
                <Form>
                    <FormLayout>
                        <TextField
                            value={nameProduct===null?data.title:nameProduct}
                            onChange={handleChangeTitle}
                            label="Title"
                            type="title"
                        /> 
                        <TextField
                            value={data.product_type}
                            label="Product Type"
                            type="product_type"
                        /> 
                        <TextField
                            value={data.vendor}
                            label="Vendor"
                            type="vendor"
                        /> 
                    </FormLayout>
                </Form>
            </Modal.Section>
        </Modal>
    );
};

export default ProductEdit;