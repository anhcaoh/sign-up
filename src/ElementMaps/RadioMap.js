import React from "react";
import { Card } from "Components/Layout";
import { RadioGroup } from "Components/Radio";
const RadioMap = ( {element, setMaps} ) => {
    return ((element.type === "radio") && 
    (<Card>
    <RadioGroup id={element.id} 
    name={element.name}
    type={element.type}
    label={element.label} 
    options={element.options} 
    setMaps={ setMaps } 
    value={ element.value } /></Card>));
};

export default RadioMap;


            