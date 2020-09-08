import React, {useState, useEffect} from 'react';
import {Segment, Grid, Icon, Button} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getUsers, getItems, getImages, loginUser } from '../redux/actions/actions'

function Cart(props) {
    // const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => { 
        if (props.items) {
            // setProducts(localStorage.getItem("cart"))
            if (localStorage.getItem("cart")) {
                let adding = 0
                localStorage.getItem("cart").split(" ").map(numb => (
                    adding += findProducts(numb).discount > 0 ? findProducts(numb).price - ((findProducts(numb).discount / 100) * findProducts(numb).price)  : findProducts(numb).price
                ))
                setTotal(new Intl.NumberFormat().format(adding))
    
            }
        }
    })

    const findProducts = (numb) => {
        let product = props.items.find(item => item.id == numb)
        return product
    }

    const removeCart = (numb) => {
        let index = localStorage.getItem("cart").split(" ").indexOf(numb)
        let newCart = localStorage.getItem("cart").split(" ").splice(index, 1)
        localStorage.setItem("cart", newCart)
        // setProducts(localStorage.getItem("cart"))

    }

    const iterate = () => {
        localStorage.getItem("cart").split(" ").map(numb => (
            buy(numb)
        ))

    }

    const buy = (numb) => {
        
        fetch(`http://localhost:3000/api/v1/items/${findProducts(numb).id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                buyer_id: props.user.id,
                public: false
            })
        })
        .then(res => res.json())
        .then(updated => {
            fetch(`http://localhost:3000/api/v1/users/${props.user.id}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
              })
              .then(res => res.json())
              .then(user => {
                  console.log(user)
                props.loginUser({...user.user})
                fetch("http://localhost:3000/api/v1/items")
                .then(res => res.json())
                .then(items => {
                    props.getItems(items)
                    fetch("http://localhost:3000/api/v1/images")
                    .then(res => res.json())
                    .then(images => {
                    props.getImages(images)
                    localStorage.removeItem("cart")
                    props.history.push('/profile') 
                    })
                })
              })
        })
    }

    return (
        props.items ? 
        <>
        <Segment style={{width: "60%", marginRight: "auto", marginLeft: "auto", display: "block"}}>
            {!localStorage.getItem("cart") ? <h3>You have nothing in your cart right now</h3> :
            localStorage.getItem("cart").split(" ").map(numb => (
                
                
                <div style={{paddingBottom: "100px", marginLeft: "100px", marginTop: "50px"}}>
                <Icon onClick={() => removeCart(numb)} style={{position: "absolute", right: "100px", marginTop: "-10px", cursor: "pointer"}} name="x"/>
                <Grid>
                <Grid.Column width={2}>
                    <img style={{height: "150px", width: "150px"}} src={findProducts(numb).images[0].url}/>
                    <h4 style={{position: "absolute", left: "170px", bottom: "80px"}}>{findProducts(numb).name}</h4>
                </Grid.Column>
                <Grid.Column width={14}>
                    <p style={{marginRight: "-500px", marginTop: "80px"}}>{findProducts(numb).discount > 0 ? `$${new Intl.NumberFormat().format(findProducts(numb).price - ((findProducts(numb).discount / 100) * findProducts(numb).price))}` : `$${new Intl.NumberFormat().format(findProducts(numb).price)}`}</p>
                </Grid.Column>
                </Grid>
                </div>
                
            ))}
            <h3>Total: ${total}</h3>
        </Segment>
        <Button onClick={iterate} style={{backgroundColor: "rgb(194, 4, 4)", color: "white"}}>Buy</Button>
        </>
        : null
    )
}

const mapStateToProps = (state) => {
    return {
      items: state.items.items,
      users: state.users.users,
      images: state.images,
      user: state.users.user
    }
}

const mapDispatchToProps = dispatch => ({
    getUsers: users => dispatch(getUsers(users)),
    loginUser: user => dispatch(loginUser(user)),
    getItems: items => dispatch(getItems(items)),
    getImages: images => dispatch(getImages(images))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));