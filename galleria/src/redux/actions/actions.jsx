export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const GET_USERS = "GET_USERS";
export const GET_ITEMS = "GET_ITEMS";
export const SELECT_ITEM = "SELECT_ITEM";
export const GET_IMAGES = "GET_IMAGES"
export const ADD_ITEM = "ADD_ITEM"
export const ADD_IMAGE = "ADD_IMAGE"
export const DELETE_IMAGE = "DELETE_IMAGE"
export const UPDATE_ITEM = "UPDATED_ITEM"

export function loginUser(user) {
    return { type: LOGIN_USER, user: user};
}

export function logoutUser() {
    return { type: LOGOUT_USER};
}

export function signupUser(user) {
    return { type: SIGNUP_USER, user: user};
}

export function getUsers(users) {
    return { type: GET_USERS, users: users}
}

export function getItems(items) {
    return { type: GET_ITEMS, items: items}
}

export function selectItem(item) {
    return { type: SELECT_ITEM, item: item}
}

export function getImages(images) {
    return { type: GET_IMAGES, images: images }
}

export function addImage(image) {
    return { type: ADD_IMAGE, image: image }
}

export function deleteImage(image) {
    return { type: DELETE_IMAGE, image: image }
}

export function addItem(item) {
    return { type: ADD_ITEM, item: item }
}

export function updateItem(item) {
    return { type: UPDATE_ITEM, item: item }
}