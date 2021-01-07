import React, { useState } from "react";
import "./textarea.scss";
const Textarea = (props) => { 
    const { type, inputType, defaultValue, className, onChangeHanlder, children } = props;
    const [value, setValue ] = useState(defaultValue || null);
    const handleOnChange = (e) => {
        setValue(e.target.value);
        onChangeHanlder && onChangeHanlder( e );
    };
    return ( (type === "textarea" && 
    <textarea 
    type={inputType || type || "text"} 
    autoComplete="new-password"
    value={ value } 
    className={ ["textarea", className].join(" ").trim() }
    onChange={ handleOnChange }
    {...props}>{children}</textarea>) || null );
};
export default Textarea;