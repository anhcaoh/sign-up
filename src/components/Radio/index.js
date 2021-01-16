import React from "react";
import { Label, Span, Text } from "Components/Typography";
import { Block } from "Components/Layout";
import Input from "Components/Input";
import "./radio.scss";
const Radio = (props) => {
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
                <Label className="radio">
                <Span className="radio__input">
                    <Input
                    name={id}
                    type={"radio"}
                    label={option.label} 
                    id={option.id}
                    value={option.value} 
                    checked={option.value === defaultValue}
                    onChange={handleOnChange} />
                    <Span className="radio__control"></Span>
                </Span>
                <Text className="radio__label">{option.label}</Text>
                </Label>
                </Block>);
            })}
            </>);
    };

    return <RadioGroup />;
};
export default Radio;