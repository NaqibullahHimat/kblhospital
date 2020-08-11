import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import{baseUrl} from '../baseUrl'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Search = ()=> {
    let [items, setItems] = useState([])
    let location = useLocation();
    let qq = location.search.slice(1);
    let q = qq.slice(qq.indexOf("=")+ 1)

    useEffect(async ()=>{
        const {data} = await axios.get(baseUrl + "/search?q=" + q);
        console.log("search results = ", data.output);
        setItems(data.output);
        }
        , [] );
    

    if(!items.length)
        return <h6> No results found for {q}</h6>

    return (
        <ul>
        {
            items.map(item =>
                <li> 
                    {item.hosEmail ? 
                     <Link to={"/hospital/" + item._id}> {item.name} </Link>
                     :
                     <Link to={"/doctor/" + item._id}> {item.name} </Link>                  
                    }

                </li>

            )
        }
        </ul>
    )
}
export default Search;