import React from "react";
import { Card } from "Components/Layout";
import { Label } from "Components/Typography";
import Textarea from "Components/Textarea";
const TextareaMap = ( {element, setMaps } ) => {
    return ((element.type === "textarea") && 
    (<Card>
    <Label>{element.label}</Label>
    <Textarea 
    id={element.id}
    type={element.type}
    name={element.name}
    rows={element.rows} 
    setMaps={ setMaps }
    value={ element.value }/></Card>));
};

export default TextareaMap;
