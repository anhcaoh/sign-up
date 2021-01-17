import React, { useState, useEffect } from "react";
import "./textarea.scss";
const Textarea = (props) => { 
    const { id, name, autoFocus, placeholder, 
    rows, columns, minLength, maxLength, defaultValue, 
    className, onBlurHandler, children } = props;
    const [value, setValue ] = useState(defaultValue || null);
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    const validateValue = ( e ) => {
        return e.target.checkValidity();
    };
    const handleOnBlur = (e) => {
        const _newValueElement = Object.assign({}, props, {
            value: e.target.value,
            "valid": validateValue( e )
        });
        onBlurHandler && 
        onBlurHandler( e, _newValueElement );
    };

    
    return ( <textarea id={id} name={name}
    type={"text"} 
    value={ value } 
    className={ ["textarea", className].join(" ").trim() }
    onBlur={ handleOnBlur }
    autoFocus={autoFocus}
    placeholder={placeholder}
    rows={rows}
    columns={columns}
    minLength={minLength}
    maxLength={maxLength}>{children}</textarea>);
};
export default Textarea;