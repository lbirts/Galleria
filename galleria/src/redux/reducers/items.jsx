import {GET_ITEMS, SELECT_ITEM} from '../actions/actions';

export default function items(state={}, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.items
            }
        case SELECT_ITEM:
            return {
                ...state,
                item: action.item
            }
        default:
            return state;
    }
}