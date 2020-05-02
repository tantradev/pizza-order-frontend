import { SELECT_ITEM, CALCULATE_TOTAL, CHANGE_CURRENCY } from '../types';

// select item from menu
const selectItem = (payload) => {
    return (dispatch) => {
        dispatch({ type: SELECT_ITEM, payload: payload });
    };
};

const calculateTotal = (payload) => {
    return (dispatch) => {
        dispatch({ type: CALCULATE_TOTAL, payload: payload });
    };
};

const changeCurrency = (payload) => {
    return (dispatch) => {
        dispatch({ type: CHANGE_CURRENCY, payload: payload });
    };
};


export default {
    selectItem,
    calculateTotal,
    changeCurrency
};