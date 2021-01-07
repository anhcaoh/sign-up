import React from "react";
import { Card } from "Components/Layout";
import { Label } from "Components/Typography";
import Input from "Components/Input";
const InputMap = ( { element, setMaps } ) => {
    return ((element.type === "input") && 
    (<Card>
    <Label>{element.label}</Label>
    <Input id={element.id}
    type={element.inputType || element.type} 
    min={element.min}
    max={element.max}
    minLength={element.minlength}
    maxLength={element.maxlength}
    setMaps={ setMaps }
    value={ element.value }
    /></Card>));
};

export default InputMap;
