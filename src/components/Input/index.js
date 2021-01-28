import React, { useEffect, useState } from "react";
import Icon from "Components/Icon";
import "./input.scss";
const Input = (props) => {
  const {
    id,
    name,
    title,
    type,
    placeholder,
    required,
    readOnly,
    disablePaste,
    className,
    checked,
    defaultChecked,
    defaultValue,
    autoFocus,
    autoComplete,
    onChangeHandler,
    onBlurHandler,
    onKeyPressHandler,
    onFocusHandler,
    min,
    max,
    minLength,
    maxLength,
    accept,
  } = props;
  const [value, setValue] = useState(defaultValue || null);
  const [inputTextType, setInputType] = useState(type);
  const validateValue = (e) => {
    return e.target.checkValidity();
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleOnBlur = (e) => {
    const _newValueElement = Object.assign({}, props, {
      value: e.target.value,
      valid: validateValue(e),
    });
    onBlurHandler && onBlurHandler(e, _newValueElement);
  };

  const handleOnChange = (e) => {
    const _value = e.target.value;
    setValue(_value);
    const _newValueElement = Object.assign({}, props, {
      value: _value,
      valid: validateValue(e),
    });
    onChangeHandler && onChangeHandler(e, _newValueElement);
  };

  const handleOnFocus = (e) => {
    onFocusHandler && onFocusHandler(e);
  };

  const handleOnKeypress = (e) => {
    if(e.key === "Enter"){
        e.target.checked = !e.target.checked;
        handleOnChange(e);
    };
    onKeyPressHandler && onKeyPressHandler(e);
  };

  const handleOnPaste = (e) => {
    if( disablePaste ){  
        e.preventDefault();
        e.stopPropagation();
    }
  };

  const isInputType = (type) => inputTextType === type;

  return (
    <>
      {((("undefined" === typeof(type)) ||
        type === "text" ||
        type === "number" ||
        type === "password" ||
        type === "radio" ||
        type === "checkbox" ||
        type === "file") && (
        <input
          id={id}
          name={name}
          type={inputTextType || type || "text"}
          className={["input", className].join(" ").trim()}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          placeholder={placeholder}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyPress={handleOnKeypress}
          onFocus={handleOnFocus}
          onPaste={handleOnPaste}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          title={title}
          min={min || (type === "number" ? 0 : null) }
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          accept={accept}
        />
      )) ||
        null}

      {type === "password" && (
        <Icon
          type={isInputType("password") ? "open-eye" : "closed-eye"}
          className="text--small input--action"
          onClick={() => {
            isInputType("password")
              ? setInputType("text")
              : isInputType("text")
              ? setInputType("password")
              : setInputType("password");
          }}
        >
          {isInputType("password") ? "Show" : "Hide"}
        </Icon>
      )}
    </>
  );
};
export default Input;
