const handleOnChange = ( obj ) => {
    console.log( props, obj );
    setElements( obj );
};

const handleOnSubmit = ( e ) => {
    e.preventDefault();
    console.log(formEl);
    console.log(e.target.checkValidity());
};

export { handleOnChange, handleOnSubmit };