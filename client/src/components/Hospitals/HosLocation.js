import React from 'react'
import useDataApi from '../../useDataApi';
import {baseUrl} from '../../baseUrl';
import {Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const HosLocation = props =>
{
  let [{data: location, isLoading, isError}, doFetch] = useDataApi(
     baseUrl + '/location/cities',
    []
  );

  return (
    
      <div>
         <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#9cec9e",border:"none",color:'black'}}  id="dropdown-basic">
            Hospitals
          </Dropdown.Toggle>

          <Dropdown.Menu>

      {isError && <div>Error Loading Data ...</div>}
      
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
              location.map(p => 
               
              <Dropdown.Item key={p._id}><Link style={{textDecoration: 'none'}} to={'/hospital/city/' + p.name}>Hospital in {p.name}</Link></Dropdown.Item>
              )
    )}
     </Dropdown.Menu>
        </Dropdown>
    </div>
  );
              }
export default HosLocation;