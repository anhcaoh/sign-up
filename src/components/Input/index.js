import React, { useEffect, useState } from "react";
import "./input.scss";
const Input = ( props ) => {
    const { id, type, inputType, className, defaultValue, 
    onChangeHanlder, onBlurHandler } = props;
    const [value, setValue ] = useState(defaultValue || null);
    const validateValue = ( e ) => {
        return e.target.checkValidity();
    };
    
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleOnBlur = (e) => {
        const _newValueElement = Object.assign({}, props, {
            value: e.target.value,
            "isValid": validateValue( e )
        });
        onBlurHandler && 
        onBlurHandler( e, _newValueElement );
    };

    const handleOnChange = (e) => {
        const _value = e.target.value;
        setValue( _value );        
        const _newValueElement = Object.assign({}, props, {
            value: _value,
            "isValid": validateValue( e )
        });
        onChangeHanlder && 
        onChangeHanlder( e, _newValueElement );
    };
    return ( (type === "input" && <input 
    id={ id }
    type={inputType || type || "text"} 
    autoComplete="new-password"
    className={ ["input", className].join(" ").trim() }
    value={ value } 
    onChange={ handleOnChange }
    onBlur={ handleOnBlur }
    {...props}
    />) || null );
};
export default Input;