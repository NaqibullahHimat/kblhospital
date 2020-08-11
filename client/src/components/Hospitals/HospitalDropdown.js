import React from 'react'
import {baseUrl} from '../../baseUrl'
import useDataApi from '../../useDataApi'
import {Container,Row,Col} from 'react-bootstrap'
import './Header.css'

const HosName= props=>{

  let [{data: hosName, isLoading, isError}, doFetch] = useDataApi(
    baseUrl + '/hospital',
   []
   );
  return(

    <Row>
    <Col>
    <div className="form-group">
            <select className="form-control">
      {isError && <div>Error Loading Data ...</div>}
      
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        hosName.map(p => 
              <option >{p.name}</option>
              )
    )}
      </select>
            </div>
        </Col>
          </Row>
          
   );
}
export default HosName;