import React from "react";
import { Label, Span, Text } from "Components/Typography";
import { Block } from "Components/Layout";
import Input from "Components/Input";
import "./checkbox.scss";
const Checkbox = (props) => {
    const { id, label, defaultValue, 
        options, onBlurHandler } = props;
        
    const handleOnChange = (e) => {
        const _newValueElement = Object.assign({}, props, {
            value: e.target.value
        });
        onBlurHandler && 
        onBlurHandler( e, _newValueElement );
    };
  
    const RadioGroup = () => { 
        return (<>
            <Label>{label}</Label>
            {options.map((option) => {
                return (<Block>
                <Label className="checkbox">
                <Span className="checkbox__input">
                    <Input
                    name={id}
                    type={"checkbox"}
                    label={option.label} 
                    id={option.id}
                    value={option.value} 
                    checked={option.value === defaultValue}
                    onChange={ handleOnChange } />
                    <Span className="checkbox__control"></Span>
                </Span>
                <Text className="checkbox__label">{option.label}</Text>
                </Label>
                </Block>);
            })}
            </>);
    };

    return <RadioGroup />;
};
export default Checkbox;