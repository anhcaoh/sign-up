import React from "react";
import "./layout.scss";
const ContentEditable = (props) => {
    return <Block id={props.id} 
    className={props.className} 
    contentEditable={props.contentEditable}
    onInput={ props.onInput} 
    title={props.title}>{props.children}</Block>;
};
const Block = (props) => { 
    return <div ref={props.ref} 
    className={props.className} 
    {...props}>{props.children}</div>;
};
const Row = (props) => { 
    return (
    <Block className={ ["row", props.className].join(" ").trim() }>
        {props.children}
    </Block>
    );
};
const Columns = (props) => { 
    return (<Block className={ ["columns", props.className].join(" ").trim() }>
        {props.children}
    </Block>);
};
const Column = (props) => { 
    return (<Block className={ ["column", props.className].join(" ").trim() }>
        {props.children}
    </Block>);
};
const Card = (props) => { 
    return (<Block ref={props.ref} 
        className={ ["card", props.className].join(" ").trim() }>
        {props.children}
    </Block>);
};

const Flexbox = (props) => { 
    return (<Block className={ ["flexbox", props.className].join(" ").trim() }>
            {props.children}
    </Block>);
};

export { Row, Columns, Column, Block, Card, Flexbox, ContentEditable };