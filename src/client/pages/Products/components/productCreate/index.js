import React, {useState} from 'react';
import { Modal, Form ,FormLayout, Checkbox, Button, TextField } from '@shopify/polaris';

const INITIAL_STATE = {
    formData: {
        title: {
            value: '',
            errMsg: '',
        },
        productType: {
            value: '',
            errMsg: '',
        },
        vendor: {
            value:'',
            errMsg: '',
        }
    },
    defaultData: {
        title: "",
        body_html: "<strong>Good snowboard!</strong>",
        vendor: "",
        product_type: "",
    }
}

const ProductCreate = (props) => {
    const {open, onClose, title, primaryAction, secondaryAction}=props;

    const [defaultData, setDefaultData] = useState(INITIAL_STATE.defaultData)
    const [formData, setFormData] = useState(INITIAL_STATE.formData);
    const [formValid, setFormValid] = useState(false);

    const hanldePrimaryAction = () => {
        let formDataKeys = Object.keys(formData)
        
        if (!formValid) {
            let _formData = JSON.parse(JSON.stringify(formData))
            _formData = {
                        ..._formData,
                        title: {
                            value:"",
                            errMsg: 'Title can not be blank'
                        },
                        productType: {
                            value: '',
                            errMsg: 'Title can not be blank',
                        },
                        vendor: {
                            value:'',
                            errMsg: 'Title can not be blank',
                        }
                    }
            setFormData(_formData)
        } else {
            let _formValid = true;
            formDataKeys.forEach(key => formData[key].errMsg ? _formValid = false : null);
            if (_formValid) {
                const _data = {...defaultData,
                                title:formData.title.value,
                                product_type:formData.productType.value,
                                vendor:formData.vendor.value
                            };
                primaryAction(_data);
            } else {
                console.log("khong goi api");
                setFormData(formData);
            }
        }
    }
    const handleSecondaryAction = () => {
        secondaryAction();
    }
    const handleOnClose = () => {
        onClose();
    }

    const onChange = (name: string, value: string): void => {
        setFormValid(true);
        let _formData = JSON.parse(JSON.stringify(formData))
        switch (name) {
            case 'title':
                if (!value) {
                    _formData = {
                        ..._formData,
                        title: {
                            value,
                            errMsg: 'Title can not be blank'
                        }
                    }
                } else {
                    if (value.length < 6) {
                        _formData = {
                            ..._formData,
                            title: {
                                value,
                                errMsg: 'Title length have must at least 6 characters'
                            }
                        }
                    } else {
                        _formData = {
                            ..._formData,
                            title: {
                                value,
                                errMsg: ''
                            }
                        }
                    }
                }
                break;

            case 'product_type':
                if (!value) {
                    _formData = {
                        ..._formData,
                        productType: {
                            value,
                            errMsg: 'Product Type can not be blank'
                        }
                    }
                } else {
                    if (value.length < 6) {
                        _formData = {
                            ..._formData,
                            productType: {
                                value,
                                errMsg: 'Product Type length have must at least 6 characters'
                            }
                        }
                    } else {
                        _formData = {
                            ..._formData,
                            productType: {
                                value,
                                errMsg: ''
                            }
                        }
                    }
                }
                break;

            case 'vendor':
                if (!value) {
                    _formData = {
                        ..._formData,
                        vendor: {
                            value,
                            errMsg: 'Vendor can not be blank'
                        }
                    }
                } else {
                    if (value.length < 6) {
                        _formData = {
                            ..._formData,
                            vendor: {
                                value,
                                errMsg: 'Vendor length have must at least 6 characters'
                            }
                        }
                    } else {
                        _formData = {
                            ..._formData,
                            vendor: {
                                value,
                                errMsg: ''
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
        setFormData(_formData)
    }
    return (
        <Modal
            open={open}
            onClose={handleOnClose}
            title={title}
            primaryAction={{
              content: 'Submit',
              onAction: hanldePrimaryAction,
              loading: props.isLoading
            }}
            secondaryActions={[
              {
                content: 'Discard',
                onAction: handleSecondaryAction,
              },
            ]}
        >
            <Modal.Section>
                <Form>
                    <FormLayout>
                        <TextField
                            value={formData.title.value}
                            onChange={(value) => onChange('title', value)}
                            label="Title"
                            type="text"
                            error={formData.title.errMsg}
                        /> 
                        <TextField
                            value={formData.productType.value}
                            onChange={(value)=>onChange('product_type',value)}
                            label="Product Type"
                            type="text"
                            error={formData.productType.errMsg}
                        /> 
                        <TextField
                            value={formData.vendor.value}
                            onChange={(value)=> onChange('vendor',value)}
                            label="Vendor"
                            type="text"
                            error={formData.vendor.errMsg}
                        /> 
                    </FormLayout>
                </Form>
            </Modal.Section>
        </Modal>
    );
};

export default ProductCreate;