import React, { useEffect, useState } from "react";
// import { ContentEditable } from "Components/Layout";
// import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import CellEditable from "./CellEditable";
import "./table.scss";
const Table = (props) => {
  const { headers, hasHeaders, data } = props || {};
  const [ elements, setElements ] = useState((data && data.elements) || []);
  const [ headings, setHeadings ] = useState([]);
  useEffect(() => {
    if( !hasHeaders && !headers?.length ){
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
    } else if( hasHeaders && headers?.length ) {
      setHeadings(headers);
    }
  }, [elements]);

  const handleOnChangeElement = (e, obj) => {
    const { id, value } = e.target;
    const { current, heading } = obj;
    const currentHeadingId = current.id + "_" + heading;
    e.target.setAttribute("data-edited", true);
    e.target.classList.toggle("label--primary", (currentHeadingId === id));
    e.target.classList.toggle("input--primary", (currentHeadingId === id));
    const _elements = elements.map(elem => {
      const elemHeadingId = elem.id + "_" + heading;
      if ( elemHeadingId === currentHeadingId ){
        elem[heading] = value;
      }
      return elem;
    });
    setElements( _elements );
  };

  return (
    <>
    {/* <ReactTooltip 
    place="left" 
    type="info" 
    effect="solid" /> */}
    <table id={props.id}
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
            elements.map((elem, index) => {
              return (
                <Draggable 
                axis="y"
                grid={[25, 25]}
                onDrag={(e, ui) => {
                  console.log(e, ui.deltaY);
                }}>
                <tr>
                  {headings &&
                    headings.map((heading, headerIndex) => {
                      return (
                        <td key={hasHeaders ? headerIndex : elem.id} 
                            title={hasHeaders ? headerIndex : (elem.id + ":" + heading)}>
                            <CellEditable 
                            id={hasHeaders ? headerIndex : (elem.id + "_" + heading)}
                            index={index}
                            element={elem} 
                            heading={hasHeaders ? headerIndex : heading}
                            rowsCount={elements?.length}
                            value={elem[hasHeaders ? headerIndex : heading]}
                            onChangeHandler={(e) => {
                              handleOnChangeElement(e, {
                                heading: (hasHeaders ? headerIndex : heading), 
                                ...{current: elem} });
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
                </tr></Draggable>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
