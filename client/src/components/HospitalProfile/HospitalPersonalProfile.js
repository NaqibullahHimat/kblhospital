import React, {useEffect, useState} from 'react'
import {Nav, Container, Row, Col, Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import {useParams} from 'react-router-dom';
import {baseUrl} from '../../baseUrl';
import axios from 'axios';

const HospitalPersonalProfile = () => {
    const { id } = useParams();
    const [data , setData] = useState ([]);

    const profileUrl = baseUrl + '/hospital/'+id;

    useEffect(() => {
        const fetchAreas = async () => {
            try{
                const result = await axios(profileUrl);
                setData(result.data);
                console.log(result.data);
            }catch (error) {
                console.log(error.message);
            }
        }
        fetchAreas();
    }, []);
    return (
        <Container style={{marginTop: "20px"}}>

        <Row style={{padding: "10px"}}>
            <Col md={4}>
                <Card style={{ width: '18rem'}} className="shadow p-3 mb-5 bg-white rounded" >
                    <Card.Img variant="top" src={`${baseUrl}/${data.hosImage}`} style={{height: '270px'}} />
                </Card>
            </Col>
            <Col md={6} style={{marginTop: "20px"}} className="shadow p-3 mb-5 bg-white rounded">
            <h5 className="font-weight-bold text-info">PROFILE</h5>

            <table class="table">
                <tbody>
                    <tr>
                        <td className="text-info">Hospital Name</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Email</td>
                        <td>{data.hosEmail}</td>
                    </tr>
                    <tr>
                        <td className="text-info">City</td>
                        <td>{data.city}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Area</td>
                        <td>{data.area}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Address</td>
                        <td>{data.hosAddress}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Contact</td>
                        <td>{data.hosContact}</td>
                    </tr>
                </tbody>
            </table>
            </Col>
        </Row>

        </Container>
    )
}

export default HospitalPersonalProfile;