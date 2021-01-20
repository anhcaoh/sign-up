import React from "react";
const H1 = (props) => { return <h1 className={props.className}>{props.children}</h1>;};
const H2 = (props) => { return <h2 className={props.className}>{props.children}</h2>;};
const H3 = (props) => { return <h3 className={props.className}>{props.children}</h3>;};
const H4 = (props) => { return <h4 className={props.className}>{props.children}</h4>;};
const Paragraph = (props) => { return <p className={props.className}>{props.children}</p>;};
const Text = (props) => { return <span className={props.className}>{props.children}</span>;};
const Label = (props) => { return <label htmlFor={props.for} className={props.className} 
                                onClick={props.onClick}>{props.children}</label>;};
const Span = (props) => { return <span className={props.className} onClick={props.onClick}>{props.children}</span>;};
export { H1, H2, H3, H4, Paragraph, Span, Text, Label };