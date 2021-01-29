import "module-alias/register";
import React, { useState } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import Import from "Features/Import";
import SignUp from "Features/SignUp";
import "Scss/style.scss";
function App() {
    const [isShowingForm, setIsShowingForm] = useState(false);
    const [data, setData] = useState(null);
    return (<Provider store={store}>
        <Import onImportedFile={(e, outputData) => {
            if(outputData) setIsShowingForm(true);
            setData(outputData);
        }}
        isShowingForm={ isShowingForm }
        showFormHandler={(isShown) => setIsShowingForm(isShown)}
        accept={"application/json,text/csv,application/vnd.ms-excel"} />
        { isShowingForm && <SignUp config={data} /> || null }
    </Provider>);
}
render(<App />, document.getElementById("root"));