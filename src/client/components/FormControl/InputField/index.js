import React from 'react'
import { TextField } from '@shopify/polaris';
import { Controller } from 'react-hook-form';

function InputField(props) {
    console.log("11111111111111111111111111111111111");
    const { form, name, label, disabled, type, control } = props;
    // const hasError = errors[name];
 
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
            }) => (
                <TextField 
                    label={label} 
                    value={value}
                    onChange={(e) => onChange(e)} 
                    type={type||"text"}
                />
            )}
        />
    )
}

export default InputField;

