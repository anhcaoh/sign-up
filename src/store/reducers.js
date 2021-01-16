import { SET_ELEMENTS, RESET } from "./constants";
import update from "immutability-helper";
import uiConfig from "Src/ui-config.json"; //can also pass down via props or HTTP GET
const initialState = update({}, {$merge : uiConfig });
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ELEMENTS : {
            const _newState = update(state, { 
                 $merge: { elements: action.elements }
            }); 
            return _newState;
        }
        case RESET : {
            const _newElements = state.elements.map((el)=>{
                return update(el, { 
                    value: { $set: "" }, 
                    valid: { $set: null }
                });
            });
            return update(state, { 
                elements: {$set: _newElements}
            });
        }
        default: return state;
    }
}
export default rootReducer;