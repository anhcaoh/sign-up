import React, { useState } from "react";
import { connect } from "react-redux";
import { setElements, reset } from "Store/actions";
import { Columns, Column, Row, Block, Flexbox } from "Components/Layout";
import { H2, Label, Text } from "Components/Typography";
import Form from "Components/Form";
import Input from "Components/Input";
import Button from "Components/Button";
import "./signup.scss";

function SignUp( props ) {
    const { elements, id,
        heading, label,
        setElements:_setElems,
        reset:_reset, 
    } = props;
    
    const [ isValidForm, setIsValidForm ] = useState( false );
    const [ hasAnyFieldValue, setHasAnyFieldValue ] = useState( false );
    const [ isSubmitted, setSubmission ] = useState( false );

    const checkCustomValidity = ( e, obj ) => {
        let _obj = Object.assign({}, obj);
        if( obj.id === "passwordConfirm" ){
            const _passwordField = elements.filter(el => {
                if (el.id === "password"){ 
                    return el;
                }
            })[0];
            const isValidField = _passwordField.value === obj.value;
            e.target.setCustomValidity( !isValidField ? "Not matching password" : "" );
            _obj.valid = isValidField;
        }
        return _obj;
    };

    const handleOnBlur = ( e, obj ) => {
        
        let currentElOfElems = null;
        const _validity = (e.target && e.target.validity) || {};
        const _elementsWithValue = 
                ((elements &&
                elements.length) && //null||undefined check
                elements.map( el => {
                    if( el.id === "passwordConfirm" && (el.id === obj.id) ){
                        const _obj = checkCustomValidity(e, obj);
                        el.value = obj.value;
                        el.valid = _obj.valid;
                        e.target.classList.toggle( "invalid", !_obj.valid );
                        e.target.classList.toggle( "valid", _obj.valid );
                    } else if (el.id === obj.id) {
                        currentElOfElems = Object.assign({}, el);//no reference
                        el.value = obj.value;
                        el.valid = _validity.valid;
                        e.target.classList.toggle( "invalid", !_validity.valid );
                        e.target.classList.toggle( "valid", _validity.valid );
                    }
                return el;
                })) || [];
        if ( currentElOfElems && 
            (currentElOfElems.value !== e.target.value) ) {
            _setElems(_elementsWithValue); //setElems when value changed
        }
        const _isValidForm = e.target.form.checkValidity();
        setIsValidForm(_isValidForm);
        hasFieldsValue();
    };

    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(elements);
        setSubmission(true);
    };

    const hasFieldsValue = ( ) => {
        const anyFieldsValue = elements.map(el => !!el.value).filter(i => i);
        setHasAnyFieldValue( anyFieldsValue.length ); //if any value, set hasAnyFieldValue 
    };
    
    const handleReset = ( e ) => {
        _reset();
        setIsValidForm(false);
        setHasAnyFieldValue(false);
    };

    return (<>
    <Row>
    <Columns>
    <Column className="col-12">
        <Flexbox>
        <Form id={id} 
            name="sign-up-form" 
            className="sign-up-form"
            onSubmit={handleOnSubmit} 
            noValidate={true}>
            <H2 className="margin-top--0">{heading}</H2>
            {isSubmitted ? <Label className="label--success">
            Congratulations! You have successfully submitted as a new user.
            </Label> : <Label>{label}</Label>}
            <Block className="vertical-space--2 margin-top--2">
                { ( elements && 
                    elements.length && (
                    elements.map((elem, index) => {
                        return (<Block>
                        <Label>{elem.label}</Label>
                        <Input id={ elem.id || null }
                        type={ elem.type || "text" }
                        inputType={ elem.inputType || "text" }
                        autoFocus={ index === 0 ? true : false }
                        placeholder={ elem.placeholder || null }
                        title={ elem.title || null }
                        readOnly={ isSubmitted }
                        defaultValue={ elem.value || "" }
                        pattern={ elem.pattern || null }
                        validation={ elem.validation || null }
                        required={ elem.required || false }
                        onBlurHandler={ handleOnBlur } />   
                        <Label className={
                            ["text--small", 
                            (elem.valid === false) ? 
                            "label--warning" : 
                            "label--default"].join(" ").trim()}>
                        {(elem.valid === false) ? 
                        elem.validityMessage : "" }</Label>
                        </Block>);    
                    })
                )) || null }
            </Block>
            <Block>
                <Button className="clear" 
                disabled={!hasAnyFieldValue || isSubmitted}
                onClick={ handleReset }>
                    <Text className="uppercase">Reset</Text>
                </Button>
                <Button type="submit" 
                className="primary float--right" 
                disabled={!isValidForm || isSubmitted }>
                    <Text className="uppercase">
                    { isSubmitted ? "Submitted" : "Submit" }
                    </Text>
                </Button>
            </Block>
        </Form>
        </Flexbox>
    </Column>
    </Columns>
    </Row>
    </>);
};

const getSortedElems = (elems) => {
    return (elems || [])
    .sort((a,b) => a.priority - b.priority)
    .filter(i => !i.hidden);
};
const mapStateToProps = (state) => {
    const _sortedElems = getSortedElems(state.elements);
    return {...state, elements: _sortedElems};
};
const mapDispatchToProps = { setElements, reset };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);