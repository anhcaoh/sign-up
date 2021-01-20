import React, { useEffect, useState } from "react";
import { ContentEditable } from "Components/Layout";
import "./table.scss";
const Table = (props) => {
  const { data } = props || {};
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
    e.target.setAttribute("data-edited", true);
    e.target.classList.toggle("label--primary", (id === current.id));
    e.target.offsetParent.classList.toggle("bg--secondary", (id === current.id));
    
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
                            value={elem[heading]}
                            id={elem.id}
                            onInput={(e) => handleOnInput(e, { heading, ...{current: elem} }) }
                            title={elem.id + ":" + 
                              ( Array.isArray(elem[heading]) ? 
                              JSON.stringify(elem[heading]) : elem[heading] ) }>
                              { Array.isArray(elem[heading]) ?
                                "[... Edit via JSON]" : typeof(elem[heading]) === "string" ?
                                elem[heading] : typeof(elem[heading]) === "number" ?
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
