import React from "react";
import { Block } from "Components/Layout";
import Input from "Components/Input";
import Dropdown from "Components/Dropdown";
// import ReactTooltip from "react-tooltip";

const CellEditable = ({ id, className, value, element, heading, headingLength, onChangeHandler }) => {
  const typeDropdown = [
    { value: "input", id: "input", label: "Input" },
    { value: "textarea", id: "textarea", label: "Textarea" },
    { value: "radio", id: "radio", label: "Radio" },
    { value: "dropdown", id: "dropdown", label: "Dropdown" },
    { value: "checkbox", id: "checkbox", label: "Checkbox" },
    { value: null, id: null, label: "" }
  ];
  const inputTypeDropdown = [
    { value: "text", id: "text", label: "Text" },
    { value: "password", id: "password", label: "Password" },
    { value: "number", id: "number", label: "Number" },
    { value: null, id: null, label: "" }
  ];
  const newHeadingList = new Array(headingLength).fill(null);
  const priorityDropdown = newHeadingList?.map((key, index) => {
    return  { value: index+1, id: index+1, label: index+1 };
  });
  const booleanDropdown = [
    { value: true, id: "true", label: "TRUE" },
    { value: false, id: "false", label: "FALSE" },
    { value: null, id: null, label: "" }
  ];
  return (
    <>
    <Block
      className={className}>
      {((heading === "type" ||
        heading === "inputType" ||
        heading === "priority") && (
        <>{(heading === "type" && (
            <Dropdown
              options={typeDropdown}
              hideSelectOne={true}
              id={id}
              name={element.name || element.id || null}
              value={value}
              onChangeHandler={onChangeHandler}
            />
          )) ||
            null}

          {(heading === "inputType" && (
            <Dropdown
              options={inputTypeDropdown}
              hideSelectOne={true}
              id={id}
              name={element.name || element.id || null}
              value={value}
              onChangeHandler={onChangeHandler}
            />
          )) ||
            null}

          {(heading === "priority" && (
            <Dropdown
              options={priorityDropdown}
              hideSelectOne={true}
              id={id}
              name={element.name || null}
              value={value}
              onChangeHandler={onChangeHandler}
            />
          )) ||
            null}
        </>
      )) ||
        ( (typeof element[heading] === "boolean" || 
          (element[heading] == "true" || 
            element[heading] == "false" ) ) && (
          <Dropdown
            options={booleanDropdown}
            hideSelectOne={true}
            id={id}
            name={element.name || null}
            value={value}
            onChangeHandler={onChangeHandler}
          />
        )) ||
        (typeof element[heading] === "number" && (
          <Input
            type="number"
            id={id}
            defaultValue={value}
            min={value}
            onChangeHandler={onChangeHandler}
          />
        )) ||
        ((typeof element[heading] === "string" ||
          typeof element[heading] === "undefined") && (
          <Input 
            type="text"
            id={id}
            defaultValue={element[heading]}
            onChangeHandler={(e) => {
              const value = e.target.value.toLowerCase();
              if( value === "true" || value === "false" ){
                e.target.value = value;
              }
              onChangeHandler(e);
            }}
          />
        )) ||  null}
    </Block></>
  );
};

export default CellEditable;
