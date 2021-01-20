import React, { useState } from "react";
import { connect } from "react-redux";
import { setElements, reset } from "Store/actions";
import { Columns, Column, Row, Block, Flexbox } from "Components/Layout";
import { H2, Label, Text } from "Components/Typography";
import Form from "Components/Form";
import Input from "Components/Input";
import Textarea from "Components/Textarea";
import Dropdown from "Components/Dropdown";
import Radio from "Components/Radio";
import Checkbox from "Components/Checkbox";
import Button from "Components/Button";
import "./signup.scss";

function SignUp(props) {
  const {
    elements,
    id,
    heading,
    label,
    setElements: _setElems,
    reset: _reset,
  } = props;

  const [isValidForm, setIsValidForm] = useState(false);
  const [hasAnyFieldValue, setHasAnyFieldValue] = useState(false);
  const [isSubmitted, setSubmission] = useState(false);

  const checkCustomValidity = (e, obj) => {
    let _obj = Object.assign({}, obj);
    if (obj.id === "passwordConfirm") {
      const _passwordField = elements.filter((el) => el.id === "password")[0];
      const _isValidField =
        obj.value !== "" && // confirm password is not empty
        _passwordField.value === obj.value; //and matching _passwordField
      e.target.setCustomValidity(!_isValidField ? "Not matching password" : "");
      _obj.valid = _isValidField;
    }
    return _obj;
  };

  const handleOnValueChanged = (e, obj) => {
    const _validity = (e && e.target && e.target.validity) || {};
    const _elementsWithValue =
      (elements &&
        elements.length && //null||undefined check
        elements.map((el) => {
          if (el.id === "passwordConfirm" && el.id === obj.id) {
            const _obj = checkCustomValidity(e, obj);
            el.value = obj.value;
            el.valid = _obj.valid;
            e.target.classList.toggle("invalid", !_obj.valid);
            e.target.classList.toggle("valid", _obj.valid);
          } else if (el.id === obj.id) {
            el.value = obj.value;
            el.valid = _validity.valid;
            e.target.classList.toggle("invalid", !_validity.valid);
            e.target.classList.toggle("valid", _validity.valid);
          }
          return el;
        })) ||
      [];
    
    const _isValidForm = e && e.target && e.target.form.checkValidity();//check after _elementsWithValue
    _setElems(_elementsWithValue); //set elements to store
    setIsValidForm(_isValidForm);
    hasFieldsValue();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(elements);
    setSubmission(true);
    window && window.scrollTo({top: 0, behavior: "smooth"});
  };

  const hasFieldsValue = () => {
    const anyFieldsValue = elements.map((el) => !!el.value).filter((i) => i);
    setHasAnyFieldValue(anyFieldsValue.length); //if any value, set hasAnyFieldValue
  };

  const handleReset = (e) => {
    _reset();
    setIsValidForm(false);
    setHasAnyFieldValue(false);
  };

  return (
    <>
      <Row>
        <Columns>
          <Column className="col-12">
            <Flexbox>
              {/* <div className="circle glass"></div> */}
              <Form
                id={id}
                name="sign-up-form"
                className="sign-up-form glass"
                onSubmit={handleOnSubmit}
                noValidate={true}
              >
                <Block className="scrollbox">
                  <H2 className="margin-top--0">{heading}</H2>
                  {isSubmitted ? (
                    <Label className="label--success">
                      Congratulations! You have successfully submitted as a new
                      user.
                    </Label>
                  ) : (
                    <Label>{label}</Label>
                  )}
                  <Block className="vertical-space--2 margin-top--2">
                    {(elements &&
                      elements.length &&
                      elements.map((elem, index) => {
                        return (
                          <>
                            <Block className="block">
                              <Label>{elem.label}</Label>

                              {(elem.type === "input" && (
                                <Input
                                  id={elem.id || null}
                                  name={elem.name || null}
                                  type={elem.inputType || elem.type || "text"}
                                  autoComplete={"new-password"}
                                  autoFocus={index === 0 ? true : false}
                                  placeholder={elem.placeholder || null}
                                  title={elem.title || null}
                                  readOnly={elem.readOnly || isSubmitted}
                                  disablePaste={elem.disablePaste}
                                  defaultValue={elem.value || ""}
                                  minLength={elem.minLength || null}
                                  maxLength={elem.maxLength || null}
                                  min={elem.min || null}
                                  max={elem.max || null}
                                  pattern={elem.pattern || null}
                                  validation={elem.validation || null}
                                  required={elem.required || false}
                                  onBlurHandler={handleOnValueChanged}
                                />
                              )) ||
                                null}

                              {(elem.type === "textarea" && (
                                <Textarea
                                  id={elem.id || null}
                                  name={elem.name || null}
                                  type={elem.type || "textarea"}
                                  value={elem.value}
                                  onBlurHandler={handleOnValueChanged}
                                ></Textarea>
                              )) ||
                                null}

                              {(elem.type === "dropdown" && (
                                <Dropdown
                                  options={elem.options}
                                  id={elem.id || null}
                                  name={elem.name || null}
                                  value={elem.value}
                                  onBlurHandler={handleOnValueChanged}
                                />
                              )) ||
                                null}

                              {(elem.type === "radio" && (
                                <Radio
                                  options={elem.options}
                                  id={elem.id || null}
                                  name={elem.name || null}
                                  defaultValue={elem.value}
                                  onChangeHandler={handleOnValueChanged}
                                />
                              )) ||
                                null}

                              {(elem.type === "checkbox" && (
                                <Checkbox
                                  options={elem.options}
                                  id={elem.id || null}
                                  name={elem.name || null}
                                  defaultValue={elem.value}
                                  onChangeHandler={handleOnValueChanged}
                                />
                              )) ||
                                null}

                              <Label
                                className={[
                                  "text--small label--validation",
                                  elem.valid === false
                                    ? "label--danger"
                                    : "label--default",
                                ]
                                  .join(" ")
                                  .trim()}
                              >
                                {elem.valid === false
                                  ? elem.validityMessage
                                  : ""}
                              </Label>
                            </Block>
                          </>
                        );
                      })) ||
                      null}
                  </Block>
                </Block>
                <Block className="call-to-actions">
                  <Button
                    className="clear"
                    disabled={!hasAnyFieldValue || isSubmitted}
                    onClick={handleReset}
                  >
                    <Text className="uppercase">Reset</Text>
                  </Button>
                  <Button
                    type="submit"
                    className="primary float--right"
                    disabled={!isValidForm || isSubmitted}
                  >
                    <Text className="uppercase">
                      {isSubmitted ? "Submitted" : "Submit"}
                    </Text>
                  </Button>
                </Block>
              </Form>
            </Flexbox>
          </Column>
        </Columns>
      </Row>
    </>
  );
}

const getSortedElems = (elems) => {
  return (elems || [])
    .sort((a, b) => a.priority - b.priority)
    .filter((i) => !i.hidden);
};
const mapStateToProps = (state, {config}) => {//config from parent props
    const _rest = config || state;
    const _sortedElems = getSortedElems( _rest.elements );
  return { ..._rest, elements: _sortedElems };
};
const mapDispatchToProps = { setElements, reset };
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
