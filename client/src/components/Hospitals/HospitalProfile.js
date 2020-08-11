import React, {useState} from 'react';
import useDataApi from '../../useDataApi';
import {baseUrl} from '../../baseUrl';
import { Row, Col, Container, Button } from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import { imgBaseUrl } from '../../imgUrl';
import HospitalDoctors from './Hosdoctors'

const HospitalProfile = () => {
    const {id} = useParams();
    const [url, setUrl] = useState(baseUrl + "/hospital/" + id)
    let [{data, isLoading, isError}, doFetch] = useDataApi(url);
    console.log(data)

    return (
        <>
            <div className="shadow p-3 mb-5 bg-white rounded" style={{padding: "20px"}}>
                <Row style={{marginTop: "20px"}}>
                    <Col md={2}>
                        <img className="rounded-circle" src={imgBaseUrl + data.hosImage} alt="Hospital Image"></img>
                    </Col>

                    <Col md={5}>
                        <h5>{data.name}</h5>
                        <p>{data.area}, {data.city}</p>
                        <p>4 Doctors Available</p>
                        <Button variant="danger" size="md">CALL {data.hosContact}</Button>
                    </Col>
                </Row>
            </div>
            <HospitalDoctors />
        </>
    )
   
}

export default HospitalProfile;