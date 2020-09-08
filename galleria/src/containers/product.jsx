import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './product.css';
import { Accordion, Icon, Grid } from 'semantic-ui-react';
import SellerProduct from './sellerproduct';
import { withRouter } from 'react-router-dom'
import { getUsers, getItems, getImages, loginUser } from '../redux/actions/actions'

function Product(props) {
    const [mainImage, setMainImage] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setImages] = useState([])

    const handleAccordion = (e, titleProps) => {
        activeIndex === titleProps.index ? setActiveIndex(-1) : setActiveIndex(titleProps.index)
    }

    useEffect(() => {
        if (props.item) {
            setMainImage(props.item.images[0])
            setImages(props.item.images)
        } else {
            setImages(findProduct().images)
            setMainImage(findProduct().images[0])
        }
    }, [props.item])

    const findProduct = () => {
        let id = window.location.href.split("/")[4]
        let product = props.items.find(item => item.id == id)
        return product
    }

    const selectImage = (image) => {
        setMainImage(image)
    }

    const findSeller = () => {
        let seller = props.users.find(user => user.id === findProduct().seller_id)
        return seller
    }

    const buyNow = () => {
        fetch(`http://localhost:3000/api/v1/items/${findProduct().id}`, {
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
                    props.history.push('/profile') 
                    })
                })
              })
        })
    }

    const addCart = () => {
        if (localStorage.cart) {
            let cart = localStorage.getItem("cart")
            cart = `${cart} ${findProduct().id}`
            localStorage.setItem("cart", cart)
        } else {
            localStorage.setItem("cart", findProduct().id)
        }
    }

    // function findMain() {
    //     let main = findProduct().images.find(image => image.id == mainImage)
    // }

    return (
        props.items && props.users && props.images ? 
        props.user.id === findProduct().seller_id ?
        <SellerProduct/> :
        <div className="product">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                    <div className="main-img">
                        <img src={findProduct().images[0].url} alt={mainImage.id}/>
                    </div>
                    <div className="images">
                        {images.map(img =>  
                            <img onClick={() => selectImage(img)} src={img.url} alt={img.id}
                        />)}
                    </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className="info">
                            <h2>{findProduct().name}</h2>
                            <p className="whole"><span className="words">Price: </span><span className="price">{findProduct().discount > 0 ? `$${new Intl.NumberFormat().format(findProduct().price - ((findProduct().discount / 100) * findProduct().price))}` : `$${new Intl.NumberFormat().format(findProduct().price)}`}</span></p>
                            {findProduct().discount > 0 ? <p><span className="strikethrough">${new Intl.NumberFormat().format(findProduct().price)}</span><span>{`(${findProduct().discount}% off)`}</span></p> : null}
                            <button onClick={buyNow} className="buy">Buy Now</button>
                            <button onClick={addCart} className="add">Add to Cart</button>
                            {findProduct().buyer_id ? <h2>SOLD</h2> : null}
                        </div>
                    </Grid.Column>
                    </Grid.Row>
                <Grid.Row>
                <Accordion styled>
                <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={handleAccordion}
                    >
                        <Icon name='dropdown'/>
                        Description
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>{findProduct().description}</p>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={handleAccordion}
                    >
                        <Icon name='dropdown'/>
                        Artist
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>{findSeller().bio}</p>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={handleAccordion}
                    >
                        <Icon name='dropdown'/>
                        Tags
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>{findProduct().tags}</p>
                    </Accordion.Content>
                </Accordion>
                </Grid.Row>
            </Grid>
        </div>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));