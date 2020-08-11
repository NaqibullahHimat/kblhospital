import React from 'react';
import {baseUrl} from '../../baseUrl'
import useDataApi from '../../useDataApi'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup} from 'react-bootstrap'

const TopCities = () => {

  let [{data: location, isLoading, isError}, doFetch] = useDataApi(
    baseUrl + '/location/cities',
   []
 );
    return (
    <div style={{backgroundColor: "white", marginTop: "20px", paddingBottom: "20px"}}>
        <h4 style={{padding: "10px"}}>Top Cities</h4>

          <Row>
          {isError && <div>Error Loading Data ...</div>}
      
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
        
              location.map(p => 

              <Col sm={3} style={{marginTop: "5px"}} key={p._id}>
              <ListGroup>
              <Link style={{textDecoration: 'none'}}  to={'/doctor/city/' + p.name}>
              <ListGroup.Item action>Doctors in {p.name}</ListGroup.Item>
              </Link>      
                </ListGroup>
              </Col>
                     )
                     )}
          </Row>
        </div>
    )
}
        
export default TopCities;