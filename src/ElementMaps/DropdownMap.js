import React from "react";
import { Card } from "Components/Layout";
import Dropdown from "Components/Dropdown";
const DropdownMap = ( {element, setMaps} ) => {
    return ((element.type === "dropdown") && 
        (<Card>
        <Dropdown id={element.id} 
        label={element.label} 
        options={element.options} 
        setMaps={setMaps} 
        value={ element.value } /></Card>));
};

export default DropdownMap;


            