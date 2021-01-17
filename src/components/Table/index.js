import React, { useEffect, useState } from "react";
import { ContentEditable } from "Components/Layout";
import "./table.scss";
const Table = (props) => {
  const { data, onInputHandler } = props || {};
  const { elements } = data || {};
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

  const handleOnInput = (e, obj) => {
    const { id, innerText:value } = e.target;
    const { current, heading } = obj;
    if(id === current.id){
      current[heading] = value;
    }
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
                            <ContentEditable 
                            contentEditable={true} 
                            id={elem.id}
                            onInput={(e) => handleOnInput(e, { heading, ...{current: elem} }) }
                            title={elem.id + ":" + (JSON.stringify(elem[heading]) || "") }>
                              { Array.isArray(elem[heading]) ?
                                "[...]" : 
                               typeof(elem[heading]) === "string" ?
                                elem[heading] : 
                               typeof(elem[heading]) === "number" ?
                                Number.parseInt(elem[heading]) : null }
                            </ContentEditable>
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
