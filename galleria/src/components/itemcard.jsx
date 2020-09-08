import React, {useState, useEffect} from 'react';
import {Card, Image }from 'semantic-ui-react';
import { connect } from 'react-redux';
import './itemcard.css';
import {Link} from 'react-router-dom';

function ItemCard(props) {
    const [images, setImages] = useState(props.images.filter(image => image.item.id === props.item.id))

    useEffect(() => {
       setImages(props.images.filter(image => image.item.id === props.item.id)) 
    }, [props.images, props.item])

    const findSeller = () => {
        let seller = props.users.find(user => user.id === props.item.seller_id)
        return seller
    }

    return (
        props.users && props.images ?
        <Link to={`image/${props.item.id}`}>
            <Card>
                <Image src={props.images.find(image => image.item.id === props.item.id).url}/>
                <Card.Content>
                    <Card.Header>{props.item.name}</Card.Header>
                    <Card.Meta>{props.item.buyer_id ? "SOLD" : props.item.discount > 0 ? `${props.item.discount}% off` : null}</Card.Meta>
                    <Card.Description>
                        Artist: {findSeller().name}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span className={props.item.discount > 0 ? "original strikethrough" : "original"}>
                        ${new Intl.NumberFormat().format(props.item.price)} 
                    </span>

                    <span style={{display: props.item.discount > 0 ? "block" : "none"}} className="discount">   ${new Intl.NumberFormat().format(props.item.price - ((props.item.discount / 100) * props.item.price))}</span>
                </Card.Content>
            </Card>
        </Link>
        : null
    )
}

const mapStateToProps = (state) => {
    return {
      users: state.users.users,
      images: state.images
    }
}

export default connect(mapStateToProps)(ItemCard);