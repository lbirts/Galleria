import React, {useState, useEffect} from 'react';
import {Modal, Button, Icon} from "semantic-ui-react";
import { connect } from 'react-redux';
import { loginUser, signupUser } from '../redux/actions/actions'

function LoginModal(props) {
    const [open, setOpen] = useState()
    const [signupOpen, setSignupOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    let token = localStorage.getItem("token")

    useEffect(() => {
        setOpen(isLoggedIn())
    }, [token])

    const isLoggedIn = () => {
        if (localStorage.getItem("token")) {
          return false
        }
        return true
    }

    const loginUser = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accpets": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        fetch("http://localhost:3000/api/v1/login", options)
        .then(res => res.json())
        .then(userInfo => {
            if (!userInfo.error) {
                localStorage.token = userInfo.jwt
                localStorage.setItem("user", JSON.stringify({...userInfo.user, token: userInfo.jwt}))
                props.loginUser({...userInfo.user, token: userInfo.jwt})
                setUsername("")
                setPassword("")
                setOpen(isLoggedIn())
                // console.log(userInfo)
            } else {
                setOpen(isLoggedIn())
            }
        })
    }

    const signupUser = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirmation, 
                bio: "",
                avatar: "",
                email: "",
                name: ""
            })
        }
        fetch("http://localhost:3000/api/v1/signup", options)
        .then(res => res.json())
        .then(userInfo => {
            if (!userInfo.error) {
                localStorage.token = userInfo.jwt
                localStorage.setItem("user", JSON.stringify({...userInfo.user, token: userInfo.jwt}))
                props.signupUser({...userInfo.user, token: userInfo.jwt})
                setUsername("")
                setPassword("")
                setPasswordConfirmation("")
                setSignupOpen(false)
                console.log(userInfo)
            } else {
                setSignupOpen(isLoggedIn())
            }
        })
    }

    
    const clickSignup = () => {
        setPassword("")
        setUsername("")
        setPasswordConfirmation("")
        setOpen(false)
        setSignupOpen(true)
    }

    const clickLogin = () => {
        setPassword("")
        setUsername("")
        setPasswordConfirmation("")
        setOpen(true)
        setSignupOpen(false)
    }

    return (
        <>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="tiny"
        >
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
            <form>
                <label htmlFor="username" style={{paddingRight: "10px"}}>Username</label>
                <input style={{width: "300px"}} className="inputChange" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <br/>
                <label htmlFor="password" style={{paddingRight: "14px"}}>Password</label>
                <input style={{width: "300px"}} className="inputChange" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete/>
            </form>
            </Modal.Content>
            <Modal.Actions>
                <button style={{cursor: "pointer", backgroundColor: "transparent", border: "0"}} onClick={() => clickSignup()}>Don't have an account?</button>
                <Button color="green" onClick={loginUser}>
                    <Icon name="checkmark"/> Login
                </Button>
            </Modal.Actions>
        </Modal>

         <Modal
            onClose={() => setSignupOpen(false)}
            onOpen={() => setSignupOpen(true)}
            open={signupOpen}
            size="tiny"
        >
            <Modal.Header>Signup</Modal.Header>
            <Modal.Content>
            <form>
                <label htmlFor="username" style={{paddingRight: "10px"}}>Username</label>
                <input style={{width: "300px"}} className="inputChange" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <br/>
                <label htmlFor="password" style={{paddingRight: "14px"}}>Password</label>
                <input style={{width: "300px"}} className="inputChange" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete/>
                <br/>
                <br/>
                <label htmlFor="password_confirmation" style={{paddingRight: "14px"}}>Confirm Password</label>
                <input style={{width: "250px"}} className="inputChange" name="password_confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} autoComplete/>
            </form>
            </Modal.Content>
            <Modal.Actions>
                <button style={{cursor: "pointer", backgroundColor: "transparent", border: "0"}} onClick={() => clickLogin()}>Already have an account?</button>
                <Button color="green" onClick={signupUser}>
                    <Icon name="checkmark"/> Signup
                </Button>
            </Modal.Actions>
        </Modal>
</>

    )
}

const mapStateToProps = (state) => {
    return {
      user: state.users.user
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch(loginUser(user)),
    signupUser: user => dispatch(signupUser(user))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);