import React from 'react'
import useDataApi from '../useDataApi';
import {baseUrl} from '../baseUrl';
import {Container,Row,Col} from 'react-bootstrap'

const SpecDropForm = props =>
{
  let [{data: specDropdown, isLoading, isError}, doFetch] = useDataApi(
     baseUrl + '/Speciality',
    []
  );

  return (
    
    
    <Row>
    <Col>
    <div className="form-group">
        
            <select className="form-control"  >

      {isError && <div>Error Loading Data ...</div>}
      
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        
              specDropdown.map(p => 
               
              
              <option >{p.name}</option>
           
         
                
              )
      
      
    )}
      </select>
            </div>
        </Col>
          </Row>
          

    
  );
              }
export default SpecDropForm;