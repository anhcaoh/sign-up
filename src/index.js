import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import UploadFile from "Features/UploadFile";
import SignUp from "Features/SignUp";
import "Scss/style.scss";
function App() {
    return (<Provider store={store}>
        <UploadFile />
        <SignUp />
    </Provider>);
}
render(<App />, document.getElementById("root"));