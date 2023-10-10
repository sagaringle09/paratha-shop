const initialState = {
  addOnPrice: {},
  parathaAddOn: {},
};

const AddOnReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADD_ON_PRICE": {
      return { ...state, addOnPrice: action.payload };
    }
    case "SET_PARATHAS_ADD_ON": {
      return { ...state, parathaAddOn: action.payload };
    }
    default:
      return state;
  }
};

export default AddOnReducer;
