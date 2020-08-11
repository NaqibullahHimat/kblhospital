import React, {useState} from 'react';
import useDataApi from '../../useDataApi';
import {baseUrl} from '../../baseUrl';
import { Row, Col, Container, Button } from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import { imgBaseUrl } from '../../imgUrl';

const HospitalDoctors = () => {
    const {id} = useParams();
    const [url, setUrl] = useState(baseUrl + "/doctor")
    let [{data, isLoading, isError}, doFetch] = useDataApi(url);
    return (
        <div style={{marginTop: "30px"}} className="shadow p-3 mb-5 bg-white rounded">
        <h4 style={{padding: "20px"}}>Available Doctors</h4>

        
            {isError && <div>Error Loading Data ...</div>}
            {isLoading ? (
                <div>Loading...</div>
            ): (
                data.map(p => 
                    <Row>
                        
                            <Col md={3} style={{padding: "10px"}}>
                            <img className="rounded-circle" src={imgBaseUrl + p.image} height={170} width={170}></img>
                            </Col>
                            <Col md={9} style={{padding: "10px"}}>
                                <h4>{p.name}</h4>
                                <p>Speciality <h6>{p.speciality}</h6></p>
                                <p>Experience <h6>{p.experience} years</h6></p>
                                <Link to={'/doctor/' + p._id}><Button variant="outline-info" size="md">SEE DOCTOR DETAILS</Button></Link>
                            </Col>
                            </Row>
                        )
                    
                )}
            
            
         

    </div>
    )
    

}

export default HospitalDoctors;
