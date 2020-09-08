import React, {useState, useRef} from 'react';
import { connect } from 'react-redux';
import './product.css';
import { Accordion, Icon, Grid } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import { addImage, addItem, selectItem} from '../redux/actions/actions'

function Create(props) {
    const [mainImage, setMainImage] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [pub, setPub] = useState()
    const [upload, setUpload] = useState([])

    const handleAccordion = (e, titleProps) => {
        activeIndex === titleProps.index ? setActiveIndex(-1) : setActiveIndex(titleProps.index)
    }

    const fileUploader = useRef()


    const selectImage = (image) => {
        setMainImage(image)
    }

    const findSeller = () => {
        let seller = props.users.find(user => user.id === props.user.id)
        return seller
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
        }
        setUpload([...upload, ...files])
       
    }

    const saveEdits = () => {
        fetch("http://localhost:3000/api/v1/items/", {
            method: "POST",
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
                public: pub,
                seller_id: props.user.id
            })
        })
        .then(res => res.json())
        .then(neww => {
            props.addItem(neww)
            console.log(neww)
            for (var i = 0; i < upload.length; i++) {
                let form = new FormData()
                form.append("image", upload[i])
                form.append("item_id", neww.id)
                fetch("http://localhost:3000/api/v1/images", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: form
                })
                .then(res => res.json())
                .then(newImg => {
                    setImages([...images, newImg])
                    setMainImage(newImg)
                    props.addImage(newImg)
                    fetch("http://localhost:3000/api/v1/items/" + neww.id)
                    .then(res => res.json())
                    .then(select => {
                        props.selectItem(select)
                        props.history.push(`/image/${neww.id}`)
                    })
                })
            }
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
                            <img onClick={() => selectImage(img)} src={img.url} alt={img.id}/>
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
      user: state.users.user,
      images: state.images,
      users: state.users.users
    }
}

const mapDispatchToProps = dispatch => ({
    addImage: image => dispatch(addImage(image)),
    addItem: item => dispatch(addItem(item)),
    selectItem: item => dispatch(selectItem(item))
  });
  
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create));