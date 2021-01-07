import { SET_ELEMENTS, RESET } from "./constants";
import uiConfig from "Src/ui-config.json"; //can also pass down via props or HTTP GET
const initialState = JSON.parse( JSON.stringify( uiConfig ) );
const _masterElements = JSON.parse( JSON.stringify( uiConfig.elements ) ); //no reference

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ELEMENTS : {
            return Object.assign({}, state, {
                elements: action.elements
            });
        }
        case RESET : {
            return Object.assign({}, state, {
                elements: _masterElements 
            });
        }
        default: return state;
    }
}
export default rootReducer;