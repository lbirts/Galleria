import React, {useState, useEffect} from 'react';
import { Grid, Segment, Button, Form, Image } from 'semantic-ui-react'
import ItemCard from '../components/itemcard';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser, logoutUser} from '../redux/actions/actions'

function Profile(props) {
    const [editting, setEditting] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        if (props.items) {        
            setName(props.user.name)
            setUsername(props.user.username)
            setEmail(props.user.email)
            setBio(props.user.bio)
        }
    }, [props.items])

    const handleSubmit = () => {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              username: username,
              name: name,
              email: email,
              bio: bio
            })
        }
        fetch(`http://localhost:3000/api/v1/users/${props.user.id}`, options)
            .then(res => res.json())
            .then(userInfo => {
                props.loginUser({...userInfo.user, token: userInfo.jwt})
            })
        setEditting(false)
    }

    const logout = () => {
        localStorage.clear()
        props.logoutUser()
        props.history.push("/")
    }

    return(
        <Grid doubling style={{paddingTop: "20px", paddingLeft: "80px"}}>
            <Grid.Column width="4">
                <Segment>
                    <Image src={props.user.avatar} size="medium" circular/>
                    <h4>Name: </h4><p>{props.user.name}</p>
                    <h4>Username: </h4><p>{props.user.username}</p>
                    <h4>Email: </h4><p>{props.user.email}</p>
                    <h4>Bio: </h4><p>{props.user.bio}</p>
                    <Button content="Edit User" style={{background: "#540e0f", marginBottom: "10px", color: "white"}} onClick={() => setEditting(true)}/>
                    <Button style={{backgroundColor: "rgb(194, 4, 4)", color: "white"}} content="Logout" onClick={logout}/>
                </Segment>
            </Grid.Column>
            <Grid.Column width="10">
                <Segment>
                {editting && props.user 
                ?
                <div>
                <Form>
                <Form.Field>
                    <label>Name</label>
                    <input value={name} name="name" onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Username</label>
                    <input value={username} name="username" onChange={(e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input name="email" value={email} type="text" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Bio</label>
                    <textarea style={{width: "100% !important"}} name="bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
                </Form.Field>
                </Form>
                <Button content="Cancel" style={{background: "rgb(194, 4, 4)", color: "white", marginTop: "20px"}} onClick={() => setEditting(false)}/>
                <Button content="Submit" style={{backgroundColor: "#540e0f", color: "white"}} onClick={handleSubmit}/>
                </div>
                :
                <>
                <div>
                <h3 style={{marginBottom: "50px"}}>Inventory</h3>
                <Grid>
                {props.user.inventory.length === 0 ? <p style={{marginLeft: "auto", marginRight: "auto"}}>You haven't uploaded anything yet</p> : props.user.inventory.map(item => (
                    <ItemCard key={item.id} item={item}/>
                ))}
                </Grid>
                </div>
                <Link to="/create"><Button style={{marginTop: "50px", marginBottom: "30px", backgroundColor: "#540e0f", color: "white"}}>Create New</Button></Link>
                <div>
                <h3>Bought</h3>
                <Grid>
                {props.user.bought.length === 0 ? 
                    <p style={{marginLeft: "auto", marginBottom: "30px", marginRight: "auto"}}>You haven't bought anything yet</p> 
                    : 
                    props.user.bought.map(item => (
                        <ItemCard key={item.id} item={item}/>
                    ))
                }
                </Grid>
                </div>
                </>
                }
                </Segment>
            </Grid.Column>
        </Grid>
    )
}
 
const mapStateToProps = (state) => {
    return {
      user: state.users.user,
      items: state.items.items
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch(loginUser(user)),
    logoutUser: () => dispatch(logoutUser())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));