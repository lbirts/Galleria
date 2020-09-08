import React from 'react';
import {Card, Image }from 'semantic-ui-react';
import { connect } from 'react-redux';
import './itemcard.css';
import {Link, withRouter} from 'react-router-dom';
import { selectItem } from '../redux/actions/actions'

function ItemCard(props) {
    // const [images, setImages] = useState(props.images.filter(image => image.item.id === props.itm.id))

    // useEffect(() => {
    //    setImages(props.images.filter(image => image.item.id === props.itm.id)) 
    // }, [props.images, props.itm])

    const findSeller = () => {
        let seller = props.users.find(user => user.id === props.itm.seller_id)
        return seller
    }

    const handleNav = () => {
        props.selectItem(props.itm)
        props.history.push(`image/${props.itm.id}`)
    }

    return (
        props.users && props.images && props.itm ?
        <div style={{cursor: "pointer"}} onClick={handleNav}>
            <Card>
                <Image src={props.itm.images[0].url}/>
                <Card.Content>
                    <Card.Header>{props.itm.name}</Card.Header>
                    <Card.Meta>{props.itm.buyer_id ? "SOLD" : props.itm.discount > 0 ? `${props.itm.discount}% off` : null}</Card.Meta>
                    <Card.Description>
                        Artist: {findSeller().name}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span className={props.itm.discount > 0 ? "original strikethrough" : "original"}>
                        ${new Intl.NumberFormat().format(props.itm.price)} 
                    </span>

                    <span style={{display: props.itm.discount > 0 ? "block" : "none"}} className="discount">   ${new Intl.NumberFormat().format(props.itm.price - ((props.itm.discount / 100) * props.itm.price))}</span>
                </Card.Content>
            </Card>
        </div>
        : null
    )
}

const mapStateToProps = (state) => {
    return {
      users: state.users.users,
      images: state.images
    }
}

const mapDispatchToProps = dispatch => ({
    selectItem: item => dispatch(selectItem(item))
  });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemCard));