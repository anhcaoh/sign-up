import React from "react";
import "./form.scss";
const Form = ( props ) => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        return e;
    };
    return(<>
        <form onSubmit={onSubmitHandler} 
        {...props}>
            {props.children}
        </form>
</>);
};
export default Form;