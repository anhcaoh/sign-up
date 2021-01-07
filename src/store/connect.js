import { connect } from "react-redux";
import { setElements, reset } from "./actions";
const Connected = ( props ) => { 
  return props.render && props.render(props);
};
const mapStateToProps = ( state ) => {
  return {
    elements: state.elements
  };
};
const mapDispatchToProps = { setElements, reset };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connected);