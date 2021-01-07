import { SET_ELEMENTS, RESET } from "./constants";
const setElements = ( elements ) => {
    return { 
        type: SET_ELEMENTS, 
        elements: elements 
    };
};
const reset = () => {
    return { 
        type: RESET
    };
};
export { setElements, reset };