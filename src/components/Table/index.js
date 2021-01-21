import React, { useEffect, useState } from "react";
import { ContentEditable } from "Components/Layout";
import CellEditable from "./CellEditable";
import "./table.scss";
const Table = (props) => {
  const { data } = props || {};
  // const { elements } = data || {};
  const [ elements, setElements ] = useState((data && data.elements) || []);
  const [ headings, setHeadings ] = useState([]);
  useEffect(() => {
    let _headings = [];
    elements && 
    elements.forEach(elem => {
      let _keys = Object.keys(elem);
      _keys.forEach(key => {
        const _keyIndex = _headings.indexOf(key);
        if( _keyIndex === -1 ){
          _headings.push(key);
        };
      });
    });
    setHeadings(_headings);
  }, [elements]);

  const handleOnChangeElement = (e, obj) => {
    const { id, value } = e.target;
    const { current, heading } = obj;
    const currentHeadingId = current.id + ":" + heading;
    e.target.setAttribute("data-edited", true);
    e.target.classList.toggle("label--primary", (currentHeadingId === id));
    e.target.classList.toggle("input--primary", (currentHeadingId === id));
    const _elements = elements.map(elem => {
      const elemHeadingId = elem.id + ":" + heading;
      if ( elemHeadingId === currentHeadingId ){
        elem[heading] = value;
      }
      return elem;
    });
    setElements( _elements );
  };

  return (
    <><table id={props.id} 
      className={["table", props.className].join(" ").trim()}>
        <thead>
          <tr>
            {headings &&
              headings.map((heading) => {
                return (
                <th key={heading}>{heading}</th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {elements &&
            elements.map((elem) => {
              return (
                <tr>
                  {headings &&
                    headings.map((heading) => {
                      return (
                        <td key={elem.id}>
                            <CellEditable element={elem} 
                            heading={heading} 
                            value={elem[heading]}
                            onChangeHandler={(e) => {
                              handleOnChangeElement(e, { heading, ...{current: elem} });
                            }}
                            />
                            {/* <ContentEditable 
                            contentEditable={true} 
                            value={elem[heading]}
                            id={elem.id}
                            onInput={(e) => handleOnChangeElement(e, { heading, ...{current: elem} }) }
                            title={elem.id + ":" + 
                              ( Array.isArray(elem[heading]) ? 
                              JSON.stringify(elem[heading]) : elem[heading] ) }>
                              { Array.isArray(elem[heading]) ?
                                "[... Edit via JSON]" : typeof(elem[heading]) === "string" ?
                                elem[heading] : typeof(elem[heading]) === "number" ?
                                Number.parseInt(elem[heading]) : null }
                            </ContentEditable> */}
                          </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
