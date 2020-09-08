import React, {useState, useEffect} from 'react';
import { Grid, Segment, Button, Form, Image } from 'semantic-ui-react'
import ItemCard from '../components/itemcard';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

function Profile(props) {
    const [myItems, setMyItems] = useState([])
    const [editting, setEditting] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        if (props.items) {        
            let mine = props.items.filter(item => item.seller_id === props.user.id)
            setMyItems(mine)
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
                console.log(userInfo)
            })
        setEditting(false)
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
                    <Button content="Edit User" style={{background: "#540e0f"}} onClick={() => setEditting(true)}/>
                </Segment>
            </Grid.Column>
            <Grid.Column width="10">
                <Segment>
                {editting 
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
                </Form>
                <Button content="Cancel" style={{background: "#540e0f"}} onClick={() => setEditting(false)}/>
                <Button content="Submit" color="green" onClick={handleSubmit}/>
                </div>
                :
                <div>
                <h3>Inventory</h3>
                {myItems.map(item => (
                    <ItemCard key={item.id} item={item}/>
                ))}
                </div>
                }
                <Link to="/create"><Button color="blue">Create New</Button></Link>
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
  
export default connect(mapStateToProps)(Profile);