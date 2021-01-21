import React, { useState } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import Button from "Components/Button";
import UploadFile from "Features/UploadFile";
import SignUp from "Features/SignUp";
import "Scss/style.scss";
function App() {
    const [isShowingForm, setIsShowingForm] = useState(false);
    const [data, setData] = useState(null);
    return (<Provider store={store}>
        <UploadFile onUploadedFile={(e, outputData) => {
            if(outputData) setIsShowingForm(true);
            setData(outputData);
        }}
        isShowingForm={ isShowingForm }
        showFormHandler={(isShown) => setIsShowingForm(isShown)}
        accept={".json, .csv"} />
        { isShowingForm && <SignUp config={data} /> || null }
    </Provider>);
}
render(<App />, document.getElementById("root"));