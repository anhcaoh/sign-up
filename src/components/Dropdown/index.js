import React from "react";
import { Label } from "Components/Typography";
import "./dropdown.scss";

const Dropdown = (props) => { 
    const { name, id, label, value, options, onChangeHandler, showLabel, hideSelectOne } = props;
    const handleOnChange = (e) => {
        const _newValueElement = Object.assign({}, props, {
            value: e.target.value
        });
        onChangeHandler && 
        onChangeHandler( e, _newValueElement );
    };
    
    return (<>
        {showLabel && <Label>{label}</Label> || null}
        <select id={id} name={name || id} 
        value={ value }
        onChange={ handleOnChange }>
            {hideSelectOne === true ? null : 
            <option selected={true} 
            value={null}>
            Select one</option> }
            {options?.map((option) => {
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