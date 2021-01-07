import React from "react";
import { Label } from "Components/Typography";
import Radio from "./index";
const RadioGroup = (props) => { 
    const _options = props.options || {};
    return (<>
        <Label>{props.label}</Label>
        {_options.map((option) => {
            return (<Radio 
            name={props.id}
            label={option.label} 
            id={option.id}
            value={option.value || option.label} 
            setMaps={props.setMaps} />);
        })}
    </>);
};
export default RadioGroup;