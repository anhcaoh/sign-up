import React, { useState } from "react";
import { Label } from "Components/Typography";
import store from "Store";
import "./dropdown.scss";
const Dropdown = (props) => { 
    const _options = props.options || {};
    const [value, setValue ] = useState(props.value);
    const onChangeHanlder = (e) => {
        const _storeState = store.getState();
        const _maps = _storeState.maps || [];
        const elementValueMaps = _maps.map(map => {
            if( map.id === props.id){
                const _value = e.target.value;
                map.value = _value;
                setValue( _value );
            }   
            return map;
        });
        elementValueMaps && props.setMaps( elementValueMaps );
    };
    
    return (<>
        <Label>{props.label}</Label>
        <select id={props.id} name={props.name} 
        value={ value }
        onChange={ onChangeHanlder }>
            <option selected={true} 
            value={null}>
            Select one</option>
            {_options.map((option) => {
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