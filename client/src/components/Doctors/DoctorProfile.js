import React, {useState, useEffect, useRef} from 'react';
import useDataApi from '../../useDataApi';
import {baseUrl} from '../../baseUrl';
import {Link,useParams, useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {Card, Row, Col, Button } from 'react-bootstrap';
import { imgBaseUrl } from '../../imgUrl';
import Rating from '../rating'
import { Scrollbars } from 'react-custom-scrollbars';


const DoctorProfile = () => {
  const {id} = useParams();
  const {path} = useRouteMatch();
  const [url, setUrl] = useState(baseUrl + "/doctor/" + id)
  let [selectedDay, setSelectedDay] = useState('');
  let [selectedTime, setSelectedTime] = useState('');
  let [avgRating, setAvgRating] = useState(0)
  let [show, setShow] = useState(false);
  let [{data: doctor, isLoading, isError}, doFetch] = useDataApi(url);
  let [ratings, setRatings] = useState([])

  let selectedDayHandler = (day) => {
    setSelectedDay(day);
  }

  let selectedTimehandler = (time) => {
    setSelectedTime(time);
  }

  const handleHideDiv = () => {
    setShow({show: true})
  }
  
  useEffect(()=>{
    async function test(){
      
        const {data: ratings} = await axios.get(baseUrl + "/rating/" + id);
        console.log("ratings = ", ratings);
        
        let sum = 0;
        for(let i=0; i<ratings.length; i++){
          sum = sum + parseInt(ratings[i].rating); 
        }
        let avgRating = (sum / ratings.length).toFixed(1);
        setAvgRating(avgRating);
        setRatings(ratings);
        
    }
    test();
  }
  
  ,[id])

  const appointmentSection = useRef(null);
  const gotoAppointmentSection = () => {
    window.scrollTo({
      top:appointmentSection.current.offsetTop,
      behavior: "smooth"
    })
  }

  const handleSubmit = async (values, options) => {
    console.log(values)
    values.apDay= selectedDay
    values.apTime= selectedTime
    values.doctorId= id

    try {
      const res = await axios.post(baseUrl + '/appointment/', values);
      console.log(res.data);
      alert('Appointment set  Successfully!');
    } 
    catch (ex) {
      console.log("=> exception => ", ex);
      if(!ex.response){
        alert("Please check your internet connection");
      } 
      else {
        alert("An Unexpected Error Occured");
      }
    }
  }
  
     return (
      <div>
         {isError && <div>Error Loading Data ...</div>}
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
        <div style={{marginTop: "25px"}}>
          <Row style={{marginTop: "25px", padding: "20px"}} className="shadow p-3 mb-5 bg-white rounded">
              <Col md={1.5}>
                      <Card style={{ width: '12rem' }}>
                          <Card.Img variant="top" src={imgBaseUrl + doctor.image} height={190} />
                          <Card.Body>
                              <Card.Text><h6>{doctor.speciality}</h6></Card.Text>
                          </Card.Body>
                      </Card>
              </Col>
              <Col md={9}>
                <h4>{doctor.name}</h4>
                <p>{doctor.qualification}</p>
                <ul class="list-inline">
                  <li class="list-inline-item"><span class="badge badge-light">{doctor.services}</span></li>
                  
                </ul>
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item list-group-item-light">Practices in {doctor.area}</li>
                  <li class="list-group-item list-group-item-light">Available today at {doctor.avbStartTime} - {doctor.avbEndTime}</li>
                  <li class="list-group-item list-group-item-light">{doctor.experience} Years Experience</li>
                </ul>

                <Row style={{marginTop: "40px"}}>
                  <Col md={5}>
                    <Button variant="danger"size="lg" style={{marginRight:'10px'}} onClick={gotoAppointmentSection}>Book Appointment</Button>
                  </Col>
                  {/* <Col md={5}>
                    <Button variant="outline-danger" size="lg" style={{marginRight:'10px'}} onClick={() => alert ("this page is under process")}>Consult Online</Button>
                  </Col> */}
                </Row>
                
              </Col>
            </Row>

          <div className="shadow p-3 mb-5 bg-white rounded">
            <Row><h5>General Info</h5></Row>
            <Row style={{marginTop: "20px"}}>
                <Col style={{border: "1px solid  #f2f2f2", width: "120px"}}>
                        <a href="#">
                            <p className="text-center" style={{marginTop: "20px"}}>{doctor.avgWaitTime} mins</p>
                            <p className="text-center"><small>Avg. Wait Time</small></p>
                        </a>
                </Col> 
                <Col style={{border: "1px solid  #f2f2f2", marginLeft: "10px", }}>
                        <a href="#">
                            <p className="text-center" style={{marginTop: "20px"}}>{doctor.avgCheckTime}  mins</p>
                            <p className="text-center"><small>Avg. Checkup Time</small></p>
                        </a>
                </Col>
                <Col style={{border: "1px solid  #f2f2f2", marginLeft: "20px"}}>
                        <p className="text-center" style={{marginLeft: "20px", marginTop: "30px"}}>Fee: Rs.{doctor.fee}</p>
                </Col>
                <Col style={{ border: "1px solid  #f2f2f2", marginLeft: "10px"}}>
                <button className="btn btn-success" style={{marginLeft: "30px", marginTop: "30px"}} onClick={handleHideDiv}>Rating{" "}{" "}<span class="badge badge-light">{avgRating || 0}</span></button>
                </Col>
            </Row>
            {
              show ?
              
              <div className="container">
              <div className="row">
                <div className="col">
                <Rating />
                </div>
                
                <div className="col" style={{marginTop: 20}}>
                  <h5>Patient Feedback</h5>
                <Scrollbars style={{height: '300px'}}>
                {
                      ratings.map(rt =>
                        (<div >
                          
                          <h6>{rt.ptName}</h6>
                          <p>{rt.comment}</p>
                          <hr />
                         
                   
                       
                        </div>)
                        )
                        
                    }
                   </Scrollbars>
                  
                  </div>
              </div>
              
              <div className="row">
          
              <a style={{marginTop: 10, marginLeft:16}} className="btn btn-danger" href={'/doctor/' + id}>Cancel</a>
              </div>
              </div>: null
            }
            
          </div>

          <div style={{marginTop: "20px"}} className="shadow p-3 mb-5 bg-white rounded">
          <h5 className="text-center" style={{padding: "10px"}}>Call to Book Appointment or Online Consultation</h5>
          <div className="text-center">
          <button className="btn btn-outline-info btn-lg">{doctor.contact}</button>
          </div>
          </div>

          <div>
            <h2 className="font-weight-bold" ref={appointmentSection}>Book Appointment</h2>
            <Row style={{marginTop:"20px"}}>
              <ul class="list-group list-group-horizontal">
                <li class="list-group-item list-group-item-light">Fee: Rs.{doctor.fee}</li>
                <li class="list-group-item list-group-item-light">Available on: {doctor.avbDays}</li>
                <li class="list-group-item list-group-item-light">Available Time: {doctor.avbStartTime} to {doctor.avbEndTime}</li>
              </ul>
            </Row>
      
        <h6 style={{marginTop: "20px"}}>Book Day to Appointment</h6>
        <Row style={{marginTop: "20px"}}>
                <div className="btn-group" role="group" style={{marginLeft: "70px"}}>
                  <button type="button"
                  className={selectedDay === 'Monday' ? "btn btn-success" : "btn btn-primary"} 
                  onClick={()=> selectedDayHandler("Monday")}>
                    Monday
                  </button>
                  <button type="button" 
                    className={selectedDay === 'Tuesday' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedDayHandler("Tuesday")} >
                    Tuesday
                  </button>
                  <button type="button" 
                    className={selectedDay === 'Wednesday' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedDayHandler("Wednesday")} >
                    Wednesday
                  </button>
                  <button type="button" 
                    className={selectedDay === 'Thursday' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedDayHandler("Thursday")} >
                    Thursday
                  </button>
                  <button type="button" 
                    className={selectedDay === 'Friday' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedDayHandler("Friday")}>
                    Friday
                  </button>
                  <button type="button" 
                    className={selectedDay === 'Saturday' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedDayHandler("Saturday")} >
                    Saturday
                  </button>
                  <button type="button" 
                    className={selectedDay === 'Sunday' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedDayHandler("Sunday")} >
                    Sunday
                  </button>
                </div>
        
        </Row>
      <br/>
      <br/>
      <h6>Select Appointment Time</h6>
      <Row>
      <div className="btn-group" role="group" style={{marginLeft: "70px"}}>
                  <button type="button" 
                    className={selectedTime === '6:30 pm' ? "btn btn-success" : "btn btn-primary"} 
                    onClick={()=> selectedTimehandler('6:30 pm')}>
                    6:30 pm
                  </button>
                  <button type="button" className={selectedTime === '7:00 pm' ? "btn btn-success" : "btn btn-primary"} 
                  onClick={()=> selectedTimehandler('7:00 pm')}>7:00 pm</button>
                  <button type="button" className={selectedTime === '7:30 pm' ? "btn btn-success" : "btn btn-primary"} 
                  onClick={()=> selectedTimehandler('7:30 pm')}>7:30 pm</button>
                  <button type="button" className={selectedTime === '8:00 pm' ? "btn btn-success" : "btn btn-primary"} 
                  onClick={()=> selectedTimehandler('8:00 pm')}>8:00 pm</button>
                  <button type="button" className={selectedTime === '8:30 pm' ? "btn btn-success" : "btn btn-primary"} 
                  onClick={()=> selectedTimehandler('8:30 pm')}>8:30 pm</button>
                </div>
      </Row>

      <Formik 
        initialValues={{
          ptName: "Naimat",
          ptContact: "0792222",
          apDay: "",
          apTime: "",
          doctorId: ""
      }}
      validationSchema={Yup.object({
        ptName:Yup.string().required("name is required"),
        ptContact:Yup.string().required("phone number is required"),
        // apDay: Yup.string().required("appointment day is required"),
        // apTime: Yup.string().required("appointment time is required")
      })}
      onSubmit={handleSubmit}>

      <Form style={{marginTop: "50px"}}>
          <h4>Patient Details for Appointment</h4>
          <div className="row">
                    <div className="col-6">
                    <div class="form-group">
                    <label class="control-label">Patient Name</label>
                    <Field 
                      name="ptName"
                      type="text" 
                      class="form-control"
                      placeholder="enter name"
                    />
                    <span className="text-danger"><ErrorMessage name="ptName" /></span>
                    </div> 
                    </div> 
                
                    <div className="col-6">
                    <div class="form-group">
                    <label class="control-label">Patient Contact</label>
                    <Field 
                      name="ptContact"
                      type="text" 
                      class="form-control"
                      placeholder="enter phone number"
                    />
                    <span className="text-danger"><ErrorMessage name="ptContact" /></span>
                    </div>
                    </div> 
                </div>

            <div className="row">
            <div className="col-6">
                    <div class="form-group">
                    <label class="control-label">Available Day</label>
                    <Field 
                      name="apDay"
                      type="text" 
                      class="form-control"
                      placeholder="available day"
                      value={selectedDay}
                    />
                    <span className="text-danger"><ErrorMessage name="apDay" /> </span>
                    </div> 
                    </div> 
                
                    <div className="col-6">
                    <div class="form-group">
                    <label class="control-label">Available Time</label>
                    <Field 
                      name="apTime"
                      type="text" 
                      class="form-control"
                      placeholder="available time"
                      value={selectedTime}
                    />
                    <span className="text-danger"><ErrorMessage name="apTime" /></span>
                    </div>
                    </div> 
            </div>
          <div>
          <button type="submit" className="btn btn-success">
              set appointment
            </button>
              <span  style={{marginLeft:'10px'}}>There are no extra charges apply through this site</span>
              </div>
      </Form>
      </Formik>

      </div>
          </div>
          )}
      </div>
     )
}

export default DoctorProfile;
