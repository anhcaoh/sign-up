import React from "react";
import { Provider } from "react-redux";
import store from "Store";
import Connected from "Store/connect";
import { H1 } from "Components/Typography";
import { Card } from "Components/Layout";
import Button from "Components/Button";
import Form from "Components/Form";
import InputMap from "./InputMap";
import TextareaMap from "./TextareaMap";
import RadioMap from "./RadioMap";
import DropdownMap from "./DropdownMap";

const ElementMaps = ( { heading, data } ) => {
    const _master = JSON.parse(JSON.stringify(data));
    const _data = (data || []).sort((a,b) => a.priority - b.priority);
    return (<Provider store={store}>
        <Connected data={data} 
            render={ ( { setMaps, reset } ) => {
            return (
            <Form>
                {_data.map((element) => {
                    return (<>
                    { heading && <H1>{heading}</H1> }
                    <InputMap element={element}
                    setMaps={setMaps} />
                    <TextareaMap element={element} 
                    setMaps={setMaps}/>
                    <RadioMap element={element} 
                    setMaps={setMaps}/>
                    <DropdownMap element={element} 
                    setMaps={setMaps}/>
                    </>);
                })}
                <Card>
                    <Button className="margin-right--3">Cancel</Button>
                    <Button className="margin-right--3" 
                    onClick={() => reset(_master) }>Reset</Button>
                    <Button type="submit" className="primary">Submit</Button>
                </Card>
            </Form>);
        }} />
        </Provider>);
};
export default ElementMaps;
export { InputMap, TextareaMap };