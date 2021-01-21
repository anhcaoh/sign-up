import React from "react";
import { Label, Span, Text } from "Components/Typography";
import Input from "Components/Input";
import "./checkbox.scss";
const Checkbox = (props) => {
  const { id, defaultValue, readOnly, 
    options, onChangeHandler } = props;

  let checkedDefaultValue = Array.isArray(defaultValue)
    ? defaultValue
    : [defaultValue];

  const handleOnChange = (e) => {
    const defaultValueIndex = checkedDefaultValue.indexOf(defaultValue);
    const inputValueIndex = checkedDefaultValue.indexOf(e.target.value);

    //handle default
    if (
      defaultValueIndex !== -1 && //if exist
      !e.target.checked
    ) {
      //and unchecked
      checkedDefaultValue.splice(defaultValueIndex, 1); //remove from list
    }

    // handle input
    if (
      inputValueIndex === -1 && //if new
      e.target.checked
    ) {
      //and checked
      checkedDefaultValue.push(e.target.value); //add to list
    } else if (
      inputValueIndex !== -1 && //otherwise exist
      !e.target.checked
    ) {
      // and unchecked
      checkedDefaultValue.splice(inputValueIndex, 1); //remove from list
    }

    const _newValueElement = Object.assign({}, props, {
      value: checkedDefaultValue,
    });
    onChangeHandler && onChangeHandler(e, _newValueElement);
  };
  return (
    <>
      {options?.map((option) => {
        return (
          <>
            <Label className="checkbox" for={id + "-" + option.id}>
              <Span className="checkbox__input">
                <Input
                  name={id + "-" + option.id}
                  type={"checkbox"}
                  label={option.label}
                  id={id + "-" + option.id}
                  readOnly={readOnly}
                  defaultValue={option.value}
                  defaultChecked={ 
                    (checkedDefaultValue.indexOf(option.value) !== -1) || //check against list
                    (option.value === defaultValue) } //or string
                    onChangeHandler={handleOnChange}
                />
                <Span className="checkbox__control"></Span>
              </Span>
              <Text className="checkbox__label">{option.label}</Text>
            </Label>
          </>
        );
      })}
    </>
  );
};
export default Checkbox;
