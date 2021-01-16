import React, { useEffect, useState } from "react";
import Icon from "Components/Icon";
import "./input.scss";
const Input = ( props ) => {
    const { id, name, title, type, placeholder,
    required, className, checked, defaultValue, autoFocus, autoComplete,
    onChangeHanlder, onBlurHandler, onFocusHandler, 
    min, max, minLength, maxLength, accept } = props;
    const [value, setValue ] = useState(defaultValue || null);
    const [inputTextType, setInputType ] = useState(type);
    const validateValue = ( e ) => {
        return e.target.checkValidity();
    };
    
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleOnBlur = (e) => {
        const _newValueElement = Object.assign({}, props, {
            value: e.target.value,
            "valid": validateValue( e )
        });
        onBlurHandler && 
        onBlurHandler( e, _newValueElement );
    };

    const handleOnChange = (e) => {
        const _value = e.target.value;
        setValue( _value );        
        const _newValueElement = Object.assign({}, props, {
            value: _value,
            "valid": validateValue( e )
        });
        onChangeHanlder && 
        onChangeHanlder( e, _newValueElement );
    };

    const handleOnFocus = (e) => {
        onFocusHandler && 
        onFocusHandler( e );
    };

    const isInputType = ( type ) => inputTextType === type; 

    return (<>
    { (type === "text" || 
    type === "password" || 
    type === "radio" || 
    type === "checkbox" || 
    type === "file" ) && 
    <input id={ id } name={ name }
    type={inputTextType || type || "text"} 
    className={ ["input", className].join(" ").trim() }
    value={ value } 
    checked={ checked }
    placeholder={placeholder}
    onChange={ handleOnChange }
    onBlur={ handleOnBlur }
    onFocus={ handleOnFocus }
    required={required}
    autoFocus={autoFocus}
    autoComplete={autoComplete}
    title={title}
    min={min}
    max={max}
    minLength={minLength}
    maxLength={maxLength}
    accept={accept} /> || null }
    
    { type === "password" && 
    <Icon type={ 
    isInputType("password") ? 
    "open-eye" : "closed-eye"}
    className="text--small input--action"
    onClick={() => { 
    isInputType("password") ? 
        setInputType("text") : 
            isInputType("text") ?  
                setInputType("password") : 
                    setInputType("password"); } }>
        {isInputType("password") ? "Show" : "Hide"}
    </Icon> }

    </>);
};
export default Input;