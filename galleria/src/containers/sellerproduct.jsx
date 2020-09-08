import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import './product.css';
import { Accordion, Icon, Grid } from 'semantic-ui-react'
import {addImage, deleteImage, updateItem, getItems, getImages, loginUser, selectItem} from '../redux/actions/actions'
import images from '../redux/reducers/images';

function SellerProduct(props) {
    const [mainImage, setMainImage] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [pub, setPub] = useState()

    const handleAccordion = (e, titleProps) => {
        activeIndex === titleProps.index ? setActiveIndex(-1) : setActiveIndex(titleProps.index)
    }

    const fileUploader = useRef()

    useEffect(() => {
        if (props.items) {
            if (props.item) {
                setMainImage(props.item.images[0])
                setImages(props.item.images)
                setName(props.item.name)
                setPrice(props.item.price)
                setDiscount(props.item.discount)
                setDescription(props.item.description)
                setTags(props.item.tags)
                setPub(props.item.public)
            } else {
                setMainImage(findProduct().images[0])
                setImages(findProduct().images)
                setName(findProduct().name)
                setPrice(findProduct().price)
                setDiscount(findProduct().discount)
                setDescription(findProduct().description)
                setTags(findProduct().tags)
                setPub(findProduct().public)
                props.selectItem(findProduct())
            }
            
        }
    }, [props.images])

    const findProduct = () => {
        let id = window.location.href.split("/")[4]
        let product = props.items.find(item => item.id == id)
        return product
    }

    const selectImage = (image) => {
        setMainImage(image)
    }

    const findSeller = () => {
        debugger
        if (props.item) {
            let seller = props.users.find(user => user.id === props.item.seller_id)
            return seller
        } else {
            let seller = props.users.find(user => user.id === findProduct().seller_id)
            return seller
        }
    }

    const openUploader = () => {
        fileUploader.current.click()
    }

    const fileChange = (e) => {
        e.preventDefault()
        let files = e.target.files
        // console.log(files)
        // files.forEach(file => console.log(file))
        for (var i = 0; i < files.length; i++) {
            console.log(files[i]);
            let form = new FormData()
            form.append("image", files[i])
            form.append("item_id", props.item.id)
            fetch("http://localhost:3000/api/v1/images", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: form
            })
            .then(res => res.json())
            .then(newImg => {
                props.addImage(newImg)
                fetch("http://localhost:3000/api/v1/items/" + props.item.id)
                .then(res => res.json())
                .then((item) => {
                    props.selectItem(item)
                    setImages(props.item.images)
                })
            })
        }
       
    }

    const deletePic = (img) => {
        fetch("http://localhost:3000/api/v1/images/" + img.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(() => {
            props.deleteImage(img)
            setImages(props.item.images)
            fetch("http://localhost:3000/api/v1/items/" + props.item.id)
            .then(res => res.json())
            .then((item) => {
                props.selectItem(item)
                setImages(props.item.images)
            })
        })
    }

    const saveEdits = () => {
        fetch("http://localhost:3000/api/v1/items/" + props.item.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                price: price,
                discount: discount,
                description: description,
                tags: tags,
                public: pub
            })
        })
        .then(res => res.json())
        .then(editted => {
            props.updateItem(editted)
            props.selectItem(editted)
            fetch("http://localhost:3000/api/v1/items")
            .then(res => res.json())
            .then(items => { 
                props.getItems(items)
            })
        })
    }

    return (
        props.items && props.users && props.images ? 
        <div className="product">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                    <div className="main-img">
                        <img src={mainImage.url} alt={mainImage.id}/>
                    </div>
                    <div className="images">
                        {images.map(img => (
                            <>
                            <Icon name="x" onClick={() => deletePic(img)}/>
                            <img onClick={() => selectImage(img)} src={img.url} alt={img.id}/>
                            </>
                        ))}
                    </div>
                    <input hidden type="file" id="file" ref={fileUploader} multiple onChange={fileChange}/>
                    <button className="photos" onClick={openUploader}>Add Photos</button>
                    </Grid.Column>
                    <Grid.Column>
                        <div className="info">
                            <label for="name">Name: </label>
                            <br/>
                            <input type="text" className="inputChange" value={name} name="name" onChange={(e) => setName(e.target.value)}/>
                            <br/>
                            <label for="price">Price: </label>
                            <br/>
                            <input type="number" className="inputChange" value={price} name="price" onChange={(e) => setPrice(e.target.value)}/>
                            <label for="discount">Discount: </label>
                            <input type="number" className="inputChange" value={discount} name="discount" onChange={(e) => setDiscount(e.target.value)}/>
                            <br/>
                            <label for="public">Public:</label>
                            <br/>
                            <input type="checkbox" className="check" checked={pub} name="public" onChange={(e) => setPub(e.target.checked)}/>
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
                        <textarea classname="areaChange" value={description} onChange={(e) => setDescription(e.target.value)} name="description"/>
                    </Accordion.Content>
                    {/* <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={handleAccordion}
                    >
                        <Icon name='dropdown'/>
                        Artist
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>{findSeller().bio}</p>
                    </Accordion.Content> */}
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={handleAccordion}
                    >
                        <Icon name='dropdown'/>
                        Tags
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <textarea classname="inputChange" value={tags} onChange={(e) => setTags(e.target.value)} name="tags"/>
                    </Accordion.Content>
                </Accordion>
                </Grid.Row>
                <button className="submit-btn" onClick={saveEdits}>Save</button>
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
      user: state.users.user,
      item: state.items.item
    }
}

const mapDispatchToProps = dispatch => ({
    addImage: image => dispatch(addImage(image)),
    deleteImage: image => dispatch(deleteImage(image)),
    updateItem: item => dispatch(updateItem(item)),
    getItems: items => dispatch(getItems(items)),
    getImages: images => dispatch(getItems(images)),
    loginUser: user => dispatch(loginUser(user)),
    selectItem: item => dispatch(selectItem(item))

  });
  
export default connect(mapStateToProps, mapDispatchToProps)(SellerProduct);