import React from "react";
const H1 = (props) => { return <h1 className={props.className}>{props.children}</h1>;};
const H2 = (props) => { return <h2 className={props.className}>{props.children}</h2>;};
const Paragraph = (props) => { return <p className={props.className}>{props.children}</p>;};
const Text = (props) => { return <span className={props.className}>{props.children}</span>;};
const Label = (props) => { return <label htmlFor={props.for} className={props.className}>{props.children}</label>;};
export { H1, H2, Paragraph, Text, Label };