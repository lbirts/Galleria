import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux'
import { getUsers, getItems, getImages, loginUser } from './redux/actions/actions'

import Nav from  './components/nav'
import Home from './containers/home'
import Profile from './containers/profile'
import Product from './containers/product'
import Create from './containers/create'
import LoginModal from './components/modal'
import Cart from './containers/cart'

const usersURL = "http://localhost:3000/api/v1/users"
const itemsURL = "http://localhost:3000/api/v1/items"
const imagesURL = "http://localhost:3000/api/v1/images"

function App(props) {

  const getUsers = () => {
    fetch(usersURL)
    .then(res => res.json())
    .then(users => {
      props.getUsers(users)
    })
  }

  const getUser = () => {
    fetch(`http://localhost:3000/api/v1/users/${props.user.id}`, {
      method: "GET",
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res => res.json())
    .then(user => {
      props.loginUser({...user.user, token: user.jwt})
    })
  }

  const getItems = () => {
    fetch(itemsURL)
    .then(res => res.json())
    .then(items => {
      props.getItems(items)
    })
  }

  const getImages = () => {
    fetch(imagesURL)
    .then(res => res.json())
    .then(images => {
      props.getImages(images)
    })
  }

  useEffect(() => {
    if (props.user) {
      getUser()
    }
    getUsers()
    getItems()
    getImages()
  }, [])

  return (
    <div className="App">
    <Router>
      <Nav/>
      <LoginModal/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/profile' component={props.user ? Profile : LoginModal}/>
      <Route exact path='/create' component={props.user ? Create : LoginModal}/>
      <Route exact path='/image/:id' component={props.user ? Product : LoginModal}/>
      <Route exact path='/cart' component={Cart}/>
    </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: users => dispatch(getUsers(users)),
  loginUser: user => dispatch(loginUser(user)),
  getItems: items => dispatch(getItems(items)),
  getImages: images => dispatch(getImages(images))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
