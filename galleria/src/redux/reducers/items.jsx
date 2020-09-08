import {GET_ITEMS, SELECT_ITEM, ADD_ITEM, UPDATE_ITEM} from '../actions/actions';

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
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.item]
            }
        case UPDATE_ITEM:
            return {
                ...state,
                items: [...state.items.filter(item => item.id !== action.item.id), action.item]
            }
        default:
            return state;
    }
}