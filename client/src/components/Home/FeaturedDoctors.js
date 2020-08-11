import React from 'react'
import {Link, Router, useParams} from "react-router-dom";
import {baseUrl} from '../../baseUrl'
import useDataApi from '../../useDataApi'
import {Container,Col,Row,Card,Button} from 'react-bootstrap'

const DocCardHome = props => {
  const {id} = useParams;
  let [{data: card, isLoading, isError}, doFetch] = useDataApi(
    baseUrl + '/doctor',
   []
 );
    return (
      <>
      <div style={{backgroundColor:"White",padding: "25px"}}>
        
        <h4 >Find Doctors & Book Appointments</h4>
        <span>People book appointments via Kabul Hospitals regulary.</span>
      <Row style={{marginTop: "25px"}} style={{padding: "20px",margin:"5px",border:"1px solid #d1cfcf"}}>
      {isError && <div>Error Loading Data ...</div>}
      
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        
              card.map(p =>
           <Col md={1.5} style={{marginLeft: "10px"}} key={p._id}>
             <Link to={'/doctor/'+ p._id}>
              <Card style={{ width: '12rem' }}>
                        <Card.Img variant="top" src={baseUrl + '/' + p.image} style={{borderRadius:"80%",padding:"10px"}} height={200} width={100} />
                        <hr/>
                        <Card.Body style={{textAlign:"center",paddingTop:"5px"}}>
                          <Card.Text className="font-weight-bold">{p.speciality}</Card.Text>
                        </Card.Body>
                    </Card>
             </Link>
                  
           </Col>
                 )
                 )}
           </Row>
           <Link to='/doctor'><Button variant="danger" style={{margin:'15px'}}>View All Speciliest</Button></Link>
           </div>
           
           </>

        
    )
}

export default DocCardHome;