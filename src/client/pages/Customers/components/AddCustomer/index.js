import React, {useState, useEffect} from 'react';
import { Page, Button, Card, Layout, FormLayout, TextField, Checkbox, Select } from '@shopify/polaris';
import { useForm, Controller } from "react-hook-form";
import InputField from '../../../../components/FormControl/InputField';


function AddCustomer(props) {
    const {control, handleSubmit, form } = useForm();
    const onSubmit = data => console.log(data);
    
    return (
        <Page
            breadcrumbs={[{
                content:"Customers",
                onAction: ()=>props.gotoPage('customers')
            }]}
            title="Add customer"
            primaryAction={
                <Button>
                Save
                </Button>
            }
        >
            <form onSubmit={handleSubmit(data=>console.log('data :>> ', data))}>
            <Layout>
                <Layout.AnnotatedSection
                    title="Basic Information"
                >
                    <Card sectioned>
                        <FormLayout>
                            <FormLayout.Group>
                                <InputField control={control} name='firstname_basic' label="First name" form={form}/> 
                                <InputField control={control} name='lastname_basic' label="Last name" form={form}/> 
                            </FormLayout.Group>
                            <InputField control={control} name='email_basic' label="Email address" type="email" form={form}/> 
                            <InputField control={control} name='phone_basic' label="Phone number" type="number" form={form}/> 
                            <Checkbox
                                label="Basic checkbox"
                                checked={false}
                                onChange={()=>{}}
                                helpText="You should ask your customers for permission before you subscribe them to your marketing emails."
                            />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
                {/* <Layout.AnnotatedSection
                    title="Default address (optional)"
                    description="Input the primary address specified by the customer"
                >
                    <Card sectioned>
                        <FormLayout>
                            <FormLayout.Group>
                                <TextField label="First name" onChange={() => {}} />
                                <TextField label="Last name" onChange={() => {}} />
                            </FormLayout.Group>
                            <TextField label="Company" onChange={() => {}} />
                            <TextField label="Address line 1" onChange={() => {}} />
                            <TextField label="Address line 2" onChange={() => {}} />
                            <TextField label="City" onChange={() => {}} />
                            <FormLayout.Group>
                                <Select
                                    label="Country"
                                    defaultData="Select a country..."
                                    options={[]}
                                    onChange={()=>{}}
                                    value={"aaa"}
                                />
                                <TextField label="Zip/Postal code" onChange={() => {}} />
                            </FormLayout.Group>
                            <TextField type="number" label="Phone number" onChange={() => {}} />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                    title="Tags"
                    description="Tags can be used to categorize customers into groups."
                >
                    <Card sectioned>
                        <Button plain>View all tags</Button>
                        <FormLayout>
                            <TextField placeholder="VIP, sale, shopper, etc." onChange={() => {}} />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection> */}
                <Layout.AnnotatedSection>
                    <Button primary onAction={()=>{}}>Save</Button>
                </Layout.AnnotatedSection>
            </Layout>
            </form>
        </Page>
    );
}

export default AddCustomer;