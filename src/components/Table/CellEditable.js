import React from "react";
import { Block } from "Components/Layout";
import Input from "Components/Input";
import Dropdown from "Components/Dropdown";

const CellEditable = ({ id, title, className, value, element, heading, onChangeHandler }) => {
  const typeDropdown = [
    { value: "input", id: "input", label: "Input" },
    { value: "textarea", id: "textarea", label: "Textarea" },
    { value: "radio", id: "radio", label: "Radio" },
    { value: "dropdown", id: "dropdown", label: "Dropdown" },
    { value: "checkbox", id: "checkbox", label: "Checkbox" },
  ];
  const inputTypeDropdown = [
    { value: "text", id: "text", label: "Text" },
    { value: "password", id: "password", label: "Password" },
  ];
  const priorityDropdown = [
    { value: "1", id: "1", label: "1" },
    { value: "2", id: "2", label: "2" },
    { value: "3", id: "3", label: "3" },
  ];
  const booleanDropdown = [
    { value: true, id: "true", label: "True" },
    { value: false, id: "false", label: "False" },
  ];
  return (
    <Block
      className={className}
      id={id}
      title={title}> 
      
      {((heading === "type" ||
        heading === "inputType" ||
        heading === "priority") && (
        <>
          {(heading === "type" && (
            <Dropdown
              options={typeDropdown}
              hideSelectOne={true}
              id={element.id + ":" + heading}
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
              id={element.id + ":" + heading}
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
              id={element.id + ":" + heading}
              name={element.name || null}
              value={value}
              onChangeHandler={onChangeHandler}
            />
          )) ||
            null}
        </>
      )) ||
        (typeof element[heading] === "boolean" && (
          <Dropdown
            options={booleanDropdown}
            hideSelectOne={true}
            id={element.id + ":" + heading}
            name={element.name || null}
            value={value}
            onChangeHandler={onChangeHandler}
          />
        )) ||
        (typeof element[heading] === "number" && (
          <Input
            type="number"
            id={element.id + ":" + heading}
            defaultValue={value}
            min={value}
            onChangeHandler={onChangeHandler}
          />
        )) ||
        ((typeof element[heading] === "string" ||
          typeof element[heading] === "undefined") && (
          <Input 
            type="text"
            id={element.id + ":" + heading}
            defaultValue={element[heading]}
            onChangeHandler={onChangeHandler}
          />
        )) ||  null}
    </Block>
  );
};

export default CellEditable;
