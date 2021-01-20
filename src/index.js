import React, { useState } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import UploadFile from "Features/UploadFile";
import SignUp from "Features/SignUp";
import "Scss/style.scss";
function App() {
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState(null);
    return (<Provider store={store}>
        <UploadFile 
        onUploadedFile={(e, outputData) => {
            if(outputData) setShowForm(true);
            setData(outputData); 
        }} 
        accept={".json, .csv"}/>
        {showForm && <SignUp config={data} /> || null }
    </Provider>);
}
render(<App />, document.getElementById("root"));