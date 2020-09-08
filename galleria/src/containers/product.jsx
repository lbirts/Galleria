import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './product.css';
import { Accordion, Icon, Grid } from 'semantic-ui-react';
import SellerProduct from './sellerproduct';

function Product(props) {
    const [mainImage, setMainImage] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setImages] = useState([])

    const handleAccordion = (e, titleProps) => {
        activeIndex === titleProps.index ? setActiveIndex(-1) : setActiveIndex(titleProps.index)
    }

    useEffect(() => {
        if (props.items) {
            setMainImage(findProduct().images[0])
            setImages(findProduct().images)
        }
    }, [props.images, props.items])

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
                        <img src={mainImage.url} alt={mainImage.id}/>
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
                            {findProduct().discount > 0 ? <p><span className="strikethrough">{new Intl.NumberFormat().format(findProduct().price)}</span><span>{`(${findProduct().discount}% off)`}</span></p> : null}
                            <button className="buy">Buy Now</button>
                            <button className="add">Add to Cart</button>
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
  
export default connect(mapStateToProps)(Product);