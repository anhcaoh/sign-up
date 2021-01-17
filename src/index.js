import React, { useState } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import UploadFile from "Features/UploadFile";
import SignUp from "Features/SignUp";
import "Scss/style.scss";
function App() {
    const [data, setData] = useState(null);
    return (<Provider store={store}>
        <UploadFile 
        onUploadedFile={(e, outputData) => {
            console.log(outputData); 
            setData(outputData); 
        }} 
        accept={".json, .csv"}/>
        <SignUp config={data} />
    </Provider>);
}
render(<App />, document.getElementById("root"));