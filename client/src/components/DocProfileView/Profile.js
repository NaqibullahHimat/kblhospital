import React, {useEffect, useState} from 'react'
import {Nav, Container, Row, Col, Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import {useParams, Link} from 'react-router-dom';
import {baseUrl} from '../../baseUrl';
import axios from 'axios';

const DoctorPersonalProfile = props => {
    const { id } = useParams();
    const [data , setData] = useState ([]);

    const profileUrl = baseUrl + '/doctor/'+id;

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
                    <Card.Img variant="top" src={`${baseUrl}/${data.image}`} style={{height: '270px'}} />
                </Card>
            </Col>
            <Col md={6} style={{marginTop: "20px"}} className="shadow p-3 mb-5 bg-white rounded">
            <h5 className="font-weight-bold text-info">PROFILE</h5>
            <Link to={`/doctor/profile/appointment/${id}`}>
                <button className="btn btn-info" style={{float: 'right', marginTop: '-30px'}}> Appointments</button>
            </Link>
            <h5 className="font-weight-bold">Dr. {data.name}</h5>
            <p>{data.speciality}</p>
            <p>{data.qualification}</p>
            <p>{data.hospital}{" "}{data.city}, Aghanistan</p>
            
            <h5 className="font-weight-bold text-info" style={{marginTop: "20px"}}>SERVICES</h5>
            <ListGroup>
                <ListGroupItem>{data.services}</ListGroupItem>
            </ListGroup>

            <table class="table">
                <tbody>
                    <tr>
                        <td className="text-info">Experience</td>
                        <td>{data.experience}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Fee</td>
                        <td>{data.fee}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Waiting Time</td>
                        <td>{data.avgWaitTime}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Checkup Time</td>
                        <td>{data.avgCheckTime}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Available To</td>
                        <td>{data.avbStartTime}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Available From</td>
                        <td>{data.avbEndTime}</td>
                    </tr>
                    <tr>
                        <td className="text-info">Availability Days</td>
                        <td>{data.avbDays}</td>
                    </tr>
                </tbody>
            </table>

            <h5 className="font-weight-bold text-info" style={{marginTop: "20px"}}>CONTACT</h5>
            <Button variant="outline-info" size="md">{data.contact}</Button>
            <p className="text-info">Email: {data.email}</p>
            </Col>

           
                
            

        </Row>

        </Container>
    )
}

export default DoctorPersonalProfile;