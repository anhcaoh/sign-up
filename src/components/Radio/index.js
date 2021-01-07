import React, { useState } from "react";
import { Label } from "Components/Typography";
import RadioGroup from "./RadioGroup";
import store from "Store";
import "./radio.scss";
const Radio = (props) => {
    const [value, setValue ] = useState(props.value);
    const onChangeHanlder = (e) => {
        const _storeState = store.getState();
        const _maps = _storeState.maps || [];
        const elementValueMaps = _maps.map(map => {
            if( map.id === props.name){
                const _value = e.currentTarget.value;
                map.value = _value;
                setValue( _value );
            }   
            return map;
        });
        elementValueMaps && props.setMaps( elementValueMaps );
    };
    
    return (<>
        <Label for={props.id}>
        <input type={"radio"}
        id={props.id}
        name={props.name}
        className={ ["radio", props.className].join(" ").trim() }
        value={ value }
        onChange={ onChangeHanlder } />
            {props.label}
        </Label>
    </>);
};
export default Radio;
export { RadioGroup };