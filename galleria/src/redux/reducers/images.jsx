import {GET_IMAGES, ADD_IMAGE, DELETE_IMAGE} from '../actions/actions';

export default function images(state=[], action) {
    switch(action.type) {
        case GET_IMAGES:
            return action.images
        case ADD_IMAGE:
            return [...state, action.image]
        case DELETE_IMAGE:
            return state.filter(img => img.id !== action.image.id)
        default:
            return state;
    }
}