const initialState = {
  items: [],
  itemCount: 0,
  deliveryCharge: 0,
};

const getTotalCount = (totalItem) => {
  return totalItem.reduce((acc, currObj) => {
    const currSum = currObj?.count;
    return acc + currSum;
  }, 0);
};

const getUpdatedValues = (state) => {
  const updatedCount = getTotalCount(state.items);
  return {
    ...state,
    itemCount: updatedCount,
  };
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      //Check if item is already in cart
      const found = state.items.findIndex((currObj) => currObj?.id === action?.payload?.id);

      // creating new data to be inserted
      let newData = {};
      newData.priceParatha = Number(action?.payload?.price);
      newData.top = action?.payload?.top;

      // If found update
      if (found !== -1) {
        newData = { ...state.items[found], ...newData };
        state.items[found] = { ...state.items[found], ...newData };
      } else {
        newData = { ...newData, ...action.payload };
        state.items = state.items.concat(newData);
      }
      //updating the values
      return getUpdatedValues(state);
    }

    case "CLEAR_CART": {
      return {
        items: [],
        itemCount: 0,
        deliveryCharge: 0,
      };
    }

    case "REMOVE_CART_ITEM": {
      state.items = state.items.filter((_, idx) => idx !== action.payload);
      if (state.items.length === 0) {
        state.deliveryCharge = 0;
      }
      //updating the values
      return getUpdatedValues(state);
    }

    case "PLUS_CART_ITEM": {
      const found = state.items.findIndex((currObj) => currObj?.id === action.payload);
      let newData = {};
      if (found !== -1) {
        newData = { ...state.items[found] };
        newData.count = state.items[found].count + 1;
        state.items[found] = { ...state.items[found], ...newData };
      }
      //updating the values
      return getUpdatedValues(state);
    }

    case "MINUS_CART_ITEM": {
      const found = state.items.findIndex((currObj) => currObj?.id === action.payload);
      let newData = {};
      if (found !== -1) {
        if (state.items[found].count - 1 === 0) {
          state.items = state.items.filter((_, idx) => idx !== found);
        } else {
          newData = { ...state.items[found] };
          newData.count = state.items[found].count - 1;
          state.items[found] = { ...state.items[found], ...newData };
        }
      }
      //updating the values
      return getUpdatedValues(state);
    }

    case "ADD_Delivery": {
      const newDeliveryCharge = Number(action?.payload);
      return {
        ...state,
        deliveryCharge: newDeliveryCharge,
      };
    }
    default:
      return state;
  }
};

export default cart;
