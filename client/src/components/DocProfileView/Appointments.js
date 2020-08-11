import React, { useState, useEffect } from "react";
import axios from 'axios';
import {baseUrl} from '../../baseUrl';
import { useParams } from "react-router-dom";

const Appointments = () =>{
const {id} = useParams();
    const [data , setData] = useState ([]);
    const appointmenturl = baseUrl + '/appointment/'+id;

    useEffect(() => {
        const fetchAreas = async () => {
            try{
                const result = await axios(appointmenturl);
                setData(result.data);
                console.log(result.data);
            }catch (error) {
                console.log(error.message);
            }
        }
        fetchAreas();
    }, []);
  
    return (
      <div className="container">
      <h5 className="font-weight-bold text-info" style={{marginTop: 15}}>APPOINTMENTS</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Partient Contact</th>
              <th>Appointment Day</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
          {data.length !==1 ?
            <div className="text-danger">No appointments yet!! </div>
            : data.map(ap=>
            <tr>
                <td>{ap.ptName}</td>
                <td>{ap.ptContact}</td>
                <td>{ap.apDay}</td>
                <td>{ap.apTime}</td>
              </tr>
          )}
              
          </tbody>
        </table>
      </div>
    );
}
export default Appointments;