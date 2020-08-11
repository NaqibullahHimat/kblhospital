import React, { useState, useEffect } from 'react'
import {Link, useParams, useRouteMatch} from "react-router-dom";
import useDataApi from '../../useDataApi';
import {baseUrl} from '../../baseUrl';
import {Card, Row, Col, Button, Container} from 'react-bootstrap';
import { imgBaseUrl } from '../../imgUrl';
import Axios from 'axios';

const DoctorCollection = () => {
    const {city, speciality} = useParams();
    console.log(speciality);
    const [data, setData] = useState([]);
    //const [url, setUrl] = useState(baseUrl + '/doctor' + (city ? '?city=' + city : '') + (speciality ? '?speciality=' + speciality : ''))
    //let [{data, isLoading, isError}, doFetch] = useDataApi(url);
    console.log(city);

    useEffect(()=>{
        async function test(){
            const res = await Axios.get(baseUrl + '/doctor' + (city ? '?city=' + city : '') + (speciality ? '?speciality=' + speciality : ''))
            console.log(res);
            setData(res.data)
        }
        test();
    },[speciality, city])

    if(!data.length){
        return(
        <div>
        <h3>List of Doctors in  {city ? city : ' all cities'}</h3>
        <div className="text-danger">
            There are no doctors register in this city yet!
        </div>
        </div>
        )
    }

    return (
        
        <div>
        {
            city && <h3>List of Doctors in  {city}</h3>,
            speciality && <h3>List of Doctors having speciality {speciality}</h3>
            
        }
         
        
  
          {data.length<1 ? (
            <div>Loading ...</div>
          ) : (
          data.map(p =>
            <Container className="shadow p-3 mb-5 bg-white rounded">
                     <Row style={{marginTop: "25px"}} style={{padding: "20px"}}>
                         <Col md={1.5}>
                                 <Card style={{ width: '12rem' }}>
                                     <Card.Img variant="top" src={imgBaseUrl + p.image} height={190} />
                                     <Card.Body>
                                     <h5><Card.Text>{p.speciality}</Card.Text></h5>
                                     </Card.Body>
                                 </Card>
                         </Col>
                         <Col md={6.5} style={{marginLeft: "20px"}}>
                             <h4><a href="#">{p.name}</a></h4>
                             <p>{p.qualification}</p>
                             <ul className="list-inline">
                                 <li className="list-inline-item"><span className="badge badge-light">{p.services} </span></li>
                                 
                             </ul>
                             <ul className="list-group list-group-horizontal">
                                 <li className="list-group-item list-group-item-light">Practices in {p.area}</li>
                                 <li className="list-group-item list-group-item-light">Available today from {p.avbStartTime} - {p.avbEndTime}</li>
                                 <li className="list-group-item list-group-item-light">{p.experience} Years Experience</li>
                             </ul>
                             <Row style={{marginTop: "40px"}}>
                                 <Col>
                                     <Link to={'/doctor/' + p._id}><Button variant="outline-danger" style={{marginRight:'10px'}}>View Complete Profile</Button></Link>
                                 </Col>
                             </Row>
                         </Col>
                         
                    </Row>
                     </Container>
          )
                )}
           
        
        </div>
    )
}

export default DoctorCollection;