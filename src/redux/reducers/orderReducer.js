
import { SELECT_ITEM, CALCULATE_TOTAL, CHANGE_CURRENCY } from '../types';

const initialState = {
    selectedItems: [],
    calculateTotal: 0,
    currency: '€'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ITEM:
            return { ...state, selectedItems: action.payload };
        case CALCULATE_TOTAL:
            return { ...state, calculateTotal: action.payload };
        case CHANGE_CURRENCY:
            return { ...state, currency: action.payload };
        default:
            return state;
    }
};