import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

let store
if (process && process.env.NODE_ENV === "development") {
    store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))
} else {
	store = createStore(reducer, applyMiddleware(...middleware))
}

export default store