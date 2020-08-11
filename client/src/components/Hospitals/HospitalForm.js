import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import validateFile from '../FileHelper';

const Hosform = () =>{

  const [url, setUrl] = useState("http://localhost:4000/hospital");
  const [hosImage, setHosImage] = useState("");
  const [hospitalErrorMsg, setHospitalErrorMsg] = useState("");
  //const [mobileNumber, setMobileNumber] = useState("");

  const handleHosImageChange = (e) => {
    const files = e.target.files;
    console.log(files[0]);

    const errors = validateFile(files, {limit: 1, type: 'image', size: 500});
    console.log('=> Profile validation Error => ', errors);
    if(!errors) {
      setHosImage(files[0]);
      setHospitalErrorMsg("");
    }
    else{
      setHospitalErrorMsg(errors.limit + errors.type + errors.size);
    }
  };

  // const handlemobileNumberChange = (e)=>{
  //   if (mobileNumber.length < e.target.value.length) {
      
  //     if (
  //       e.target.value[mobileNumber.length] >= 0 &&
  //       e.target.value[mobileNumber.length] <= 9
  //     )
  //      {
  //       setMobileNumberErrorMsg("");
        
  //       if (
  //         e.target.value.length === 5 &&
  //         e.target.value[4] !== "-"
  //       ) {
  //         console.log(e.target.value.length, e.target.value.substring(0, 4), e.target.value.substring(4));
          
  //         setMobileNumber(
  //           e.target.value.substring(0, 4) + '-' + e.target.value.substring(4)
  //         );
  //       }
  //        else if (e.target.value.length >= 12) {
  //         setMobileNumber(e.target.value.substring(0, 12));
  //       }
  //        else {
  //         setMobileNumber(e.target.value);
  //       }
  //     } 
  //     else {
  //       setMobileNumberErrorMsg("Only Digits are allowed");
  //     }
  //   } 
  //   else {
  //     setMobileNumber(e.target.value);
  //   }
  // }

  const handleSubmit = async (values, options) => {
    console.log("hello")
    console.log(values)
    if (!hosImage) {
      setHospitalErrorMsg("Profile is required");
      return;
    }

    const formData = new FormData();
    formData.append("file", hosImage);

    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    try {
     
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(res.data);
      alert('Hospital Registered Successfully!');
    } 
    catch (ex) {
      console.log("=> exception => ", ex);
      if(!ex.response){
        alert("Please check your internet connection");
      } 
      else if(ex.response && ex.response.status < 500) {
        // const {field} = ex.response.data;
        if(ex.response.status === 409)
        alert("Server Validation Error: \n" + "Email already exits!");
        else 
            alert("Server Validation Error: Invalid Data Poted!");
      }
      else {
        alert("An Unexpected Error Occured");
      }
    }
  }
 
  return(
    <Formik
      initialValues={{
        name: "kfc",
        hosEmail:"kfc@gmIL.com",
        hosPassword:"112233",
        hosAddress:"shinwari 032",
        city:"Kabul",
        area: "shinwari",
        hosContact: "098765432123", 
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        hosEmail: Yup.string().required("Email isequired"),
        hosPassword:Yup.string().required("Password is required"),
        hosAddress: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        area: Yup.string().required("Area is required"),
        hosContact:Yup.string().required("Contact is required"),  
      })}
      onSubmit={handleSubmit}>
      <Form>
        <div className="shadow p-3 mb-5 bg-white rounded">
        <h3>Hospital Registration </h3>
          <div className="form-group">
            <label className="control-label">Hospital Name</label>
            <Field
              name="name"
              type="text"
              className="form-control"
              placeholder="enter your hospital name"
            />
            <span className='text-danger'><ErrorMessage name="name" /></span>
          </div>

          <div className="form-group">
            <label className="control-label">Email</label>
            <Field
              name="hosEmail"
              type="email"
              className="form-control"
              placeholder="enter email"
            />
            <span className='text-danger'><ErrorMessage name="email" /></span>
          </div>

          <div className="form-group">
            <label className="control-label">Password</label>
            <Field
              name="hosPassword"
              type="password"
              className="form-control"
              placeholder="enter password"
            />
            <span className='text-danger'><ErrorMessage name="password" /></span>
          </div>

          <div className="form-group">
            <label className="control-label">Address</label>
            <Field
              name="hosAddress"
              type="text"
              className="form-control"
              placeholder="enter address"
            />
            <span className='text-danger'><ErrorMessage name="hosAddress" /></span>
          </div>

          <div className="form-group">
            <label className="control-label">City</label>
            <Field
              name="city"
              type="text"
              className="form-control"
              placeholder="enter address"
            />
            <span className='text-danger'><ErrorMessage name="city" /></span>
          </div>

          <div className="form-group">
            <label className="control-label">Area</label>
            <Field
              name="area"
              type="text"
              className="form-control"
              placeholder="enter area"
            />
            <span className='text-danger'><ErrorMessage name="area" /></span>
          </div>

          <div className="form-group">
            <label className="control-label">Contact</label>
            <Field
              name="hosContact"
              type="text"
              className="form-control"
              placeholder="enter contact"
            />
            <span className='text-danger'><ErrorMessage name="hosContact" /></span>
          </div>

          <div>
          <h5>Upload Profile Pic</h5>
          <div className="custom-file">
            <Field
              name="file" 
              type="file"  
              id="picture"
              onChange={handleHosImageChange}
              accept="image/*" />
            <label className="custom-file-label" htmlFor="picture">
            {(hosImage && hosImage.name) || "Upload Profile"}</label>
          </div>
          <div className="text-danger">{setHospitalErrorMsg}</div>
          </div>
          <div className="text-center" style={{marginTop: "20px"}}>
            <button type="submit" className="btn btn-primary btn-lg text-center">Submit</button>
          </div>

        </div>
      </Form>
    </Formik> 
  );

}
export default Hosform;