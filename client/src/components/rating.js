import React,{useState} from 'react'
import axios from 'axios';
import * as Yup from "yup";
import {useParams} from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import { baseUrl } from '../baseUrl';

const Rating = () => {
    const {id} = useParams();
    const [url, seturl] = useState (baseUrl + '/rating');
    

    const handleSubmit = async (values, options) => {  
      console.log(values)
      
      try {
        const res = await axios.post(url + '/' + id, values
        );
        console.log(res.data);
        alert('Rating submitted Successfully!');
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
        <Formik 
        initialValues={{
          ptName: "saif",
          doctor: "",
          comment: "",
          rating: ""
      }}
      validationSchema={Yup.object({
        ptName:Yup.string().required("name is required"),
        comment:Yup.string().required("comment is required"),
        rating: Yup.number().max(5, 'max rating is 5').required("rating is required"),
      })}
      onSubmit={handleSubmit}>

      <Form style={{marginTop: "20px"}}>
      <h4>Add your rating</h4>
          
                    <div className="form-group">
                    <label className="control-label">Patient Name</label>
                    <Field 
                      name="ptName"
                      type="text" 
                      className="form-control"
                      placeholder="enter name"
                    />
                    <span className="text-danger"><ErrorMessage name="ptName" /></span>
                    </div> 
                   
            
                    <div className="form-group">
                    <label className="control-label">Rating</label>
                    <Field 
                      name="rating"
                      type="number" 
                      className="form-control"
                      placeholder="enter rating"
                    />
                    <span className="text-danger"><ErrorMessage name="rating" /></span>
                    </div>
                   

            
                    <div className="form-group">
                    <label className="control-label">Comment</label>
                    <Field 
                      name="comment"
                      type="text" 
                      className="form-control"
                      placeholder="enter comment here"
                      // value={selectedDay}
                    />
                    <span className="text-danger"><ErrorMessage name="comment" /></span>
                    </div> 
                   

          <button type="submit" className="btn btn-success">
              Submit
            </button>
      </Form>
        
      </Formik>
      
      {/* <button type="cancel" className="btn btn-danger" style={{mrginTop: 30}}>Cancel</button> */}
        </div>
    )
}

export default Rating;