import {GET_IMAGES} from '../actions/actions';

export default function images(state=[], action) {
    switch(action.type) {
        case GET_IMAGES:
            return action.images
        default:
            return state;
    }
}