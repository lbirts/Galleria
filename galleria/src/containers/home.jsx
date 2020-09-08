import React, {useState, useEffect} from 'react';
import ItemCard from '../components/itemcard';
import { connect } from 'react-redux';
import {Grid} from 'semantic-ui-react';

function Home(props) {
    const [searchItem, setSearchItem] = useState("")
    const [publicItems, setPublicItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    useEffect(() => {
        if (props.items) {
        setPublicItems(props.items.filter(item => item.public === true))
        }
    }, [props.items])

    useEffect(() => {
        setFilteredItems(publicItems)
    }, [publicItems])

    const searchItems = (e) => {
        setSearchItem(e.target.value)
        setTimeout(() => {
            let filtered = [...publicItems]
            if (searchItem !== "") {
                filtered = filtered.filter(item => item.tags.toLowerCase().includes(searchItem.toLowerCase()))
            }
            setFilteredItems(filtered)
        }, 500);
    }

    return (
        props.items ? 
        <div className="home">
            <div style={{paddingBottom: "50px", marginTop: "50px"}} className="ui search">
                <div className="ui icon input">
                <input className="prompt" velue={searchItem} onChange={searchItems}/>
                <i className="search icon" />
                </div>
            </div>
            <Grid>
            {filteredItems.map(item => (
                <ItemCard key={item.id} item={item}/>
            ))}
            </Grid>
        </div>
        : null
    )
}

const mapStateToProps = (state) => {
    return {
      items: state.items.items
    }
}
  
export default connect(mapStateToProps)(Home);
  