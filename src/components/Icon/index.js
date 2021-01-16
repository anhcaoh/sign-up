import React from "react";
import "./icon.scss";
const Icon = (props) => {
    return (<span 
    type={"icon"}
    aria-hidden={true}
    onClick={props.onClick}
    className={["icon-"+props.type, 
        props.className].join(" ").trim()}>
        {props.children}
    </span>);
};
export default Icon;