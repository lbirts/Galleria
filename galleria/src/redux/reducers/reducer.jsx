import { combineReducers } from 'redux'
import users from './users'
import items from './items'
import images from './images'
const reducer = combineReducers({
    users,
    items,
    images
});

export default reducer