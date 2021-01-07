import React from "react";
import "./layout.scss";
const Block = (props) => { 
    return <div className={props.className}>{props.children}</div>;
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
    return (<Block className={ ["card", props.className].join(" ").trim() }>
        {props.children}
    </Block>);
};

const Flexbox = (props) => { 
    return (<Block className={ ["flexbox", props.className].join(" ").trim() }>
        {/* <Block> */}
            {props.children}
        {/* </Block> */}
    </Block>);
};

export { Row, Columns, Column, Block, Card, Flexbox };