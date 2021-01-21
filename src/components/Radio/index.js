import React from "react";
import { Label, Span, Text } from "Components/Typography";
import Input from "Components/Input";
import "./radio.scss";
const Radio = (props) => {
  const { id, defaultValue, readOnly, 
    options, onChangeHandler } = props;

  const handleOnChange = (e) => {
    const _newValueElement = Object.assign({}, props, {
      value: e.target.value,
    });
    onChangeHandler && onChangeHandler(e, _newValueElement);
  };
  return (
    <>
      {options?.map((option) => {
        return (
          <Label className="radio">
            <Span className="radio__input">
              <Input
                name={id}
                type={"radio"}
                label={option.label}
                id={id + "-" + option.id}
                readOnly={readOnly}
                defaultValue={option.value}
                defaultChecked={option.value === defaultValue}
                onChangeHandler={handleOnChange}
              />
              <Span className="radio__control"></Span>
            </Span>
            <Text className="radio__label">{option.label}</Text>
          </Label>
        );
      })}
    </>
  );
};
export default Radio;
