import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import useDataApi from '../../useDataApi';
import {baseUrl} from '../../baseUrl';
import { Row, Col, Container, Button } from 'react-bootstrap';
import SelectLocation from '../SelectLocation';
import axios from "axios"

import { imgBaseUrl } from '../../imgUrl';
import DoctorCollection from '../Doctors/DoctorCollection';

const HospitalCollection = () => {
	const {city} = useParams();
	const [url, setUrl] = useState(baseUrl + '/hospital' + (city ? '?city=' + city : ''))
	const [hospital, setHospital] = useState([]);
	//let [{data: hospital, isLoading, isError}, doFetch] = useDataApi(url);
	console.log(city);

	useEffect(()=>{
		async function test(){
		const res = await axios.get(baseUrl + '/hospital' + (city ? '?city=' + city : ''));
		setHospital(res.data);
		}
		test();
			},[city])

	if(!hospital.length){
		return(
		<div>
		<h3>List of Hospitals in  {city ? city : ' all cities'}</h3>
		<div className="text-danger">
				There are no Hospitals register in this city yet!
		</div>
		</div>
		)
	}
		
    return (
			<div>
			<h3 style={{padding: "10px"}}>List of Hospitals in  {city ? city : ' all cities'}</h3>
			{/* <SelectLocation /> */}
        
			
  
          {hospital.length<1 ? (
            <div>Loading ...</div>
          ) : (
            hospital.map(hos =>
                <div style={{backgroundColor: "white", marginTop: "20px"}}>
				<Row style={{marginTop: "20px", marginBottom: "30px"}} className="shadow p-3 mb-5 bg-white rounded">
					<Col md={2}>
						<img src={imgBaseUrl + hos.hosImage} alt="Hospital Image" width={100} height={100}></img>
					</Col>

					<Col md={5}>
						<h3><a href="#">{hos.name}</a></h3>
						<p>{hos.area}, {hos.city}</p>
						<p>110 Doctors Available</p>
						<Link className='st' style={{textDecoration: 'none'}} to={'/hospital/' + hos._id}><Button variant="danger" size="md">VIEW DETAILS</Button></Link>
					</Col>
				</Row>
        </div>    
            )
		  )}
        </div>
    )
}

export default HospitalCollection;