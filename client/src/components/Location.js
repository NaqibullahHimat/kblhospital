import React from 'react'
import useDataApi from '../useDataApi';
import {baseUrl} from '../baseUrl';
import {} from 'react-bootstrap'

const Location = props =>
{
  let [{data: location, isLoading, isError}, doFetch] = useDataApi(
     baseUrl + '/location/cities',
    []
  );

  return (
    
      <div>
           
           {isError && <div>Error Loading Data ...</div>}
  
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <select id="user_city" className="u-full-width" style={{ width:"100%",boxShadow: "1px 1px 10px #eee", border: "1px solid #59B4D9", paddingTop: '2px', paddingBottom: '2px'}}>
              {location.map(p => 
              <option value="Pakistan" key={p._id}>{p.name}</option>       
              )}
              </select>
    )}
    
    </div>

  );
              }
export default Location;