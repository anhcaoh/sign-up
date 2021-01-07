import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import SignUp from "Features/SignUp";
import "Scss/style.scss";
const TSTLogo = () => {
    return (<div className="tst stamped--bottom-right">TST</div>);
};
function App() {
    return (<Provider store={store}>
        <SignUp  />
        <TSTLogo />
    </Provider>);
}
render(<App />, document.getElementById("root"));