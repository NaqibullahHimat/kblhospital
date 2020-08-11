import React, {useState} from 'react'
import useDataApi from '../useDataApi';
import {baseUrl} from '../baseUrl';
import {Dropdown} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import DoctorCollection from './Doctors/DoctorCollection';


const SpecDropdown = () => {

  let [{data: specDropdown, isLoading, isError}, doFetch] = useDataApi(
     baseUrl + '/speciality',
     []
);

  return (
    
      <div>
         <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#9cec9e",border:"none",color:'black'}}  id="dropdown-basic">
            Doctors
          </Dropdown.Toggle>
          
          <Dropdown.Menu>

      {isError && <div>Error Loading Data ...</div>}
      
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        
              specDropdown.map(p => 
              
              <Dropdown.Item key={p._id}><Link  style={{textDecoration: 'none'}}  to={'/doctor/speciality/' + p.name}>{p.name}</Link></Dropdown.Item>
              
              )
      
    )}
     </Dropdown.Menu>
        </Dropdown>
    </div>

    
  );
              }
export default SpecDropdown;