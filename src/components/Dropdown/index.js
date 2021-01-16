import React, { useState } from "react";
import { Label } from "Components/Typography";
import "./dropdown.scss";

const Dropdown = (props) => { 
    const { name, id, label, value, options, onBlurHandler } = props;
    const handleOnChange = (e) => {
        const _newValueElement = Object.assign({}, props, {
            value: e.target.value
        });
        onBlurHandler && 
        onBlurHandler( e, _newValueElement );
    };
    
    return (<>
        <Label>{label}</Label>
        <select id={id} name={name} 
        value={ value }
        onChange={ handleOnChange }>
            <option selected={true} 
            value={null}>
            Select one</option>
            {options.map((option) => {
                return (
                    <option id={option.id} 
                        value={ option.value }>
                        {option.label}
                    </option>
                );
            })}
        </select>
    </>);
};
export default Dropdown;